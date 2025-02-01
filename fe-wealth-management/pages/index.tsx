import React, { useState, useCallback } from 'react';
import '../styles/global.css';
import { parse, visit, FieldNode } from 'graphql';
import OpenAI from 'openai';

type Mapping = {
  oldField: string;
  newField: string;
  status: 'suggested' | 'missing' | 'confirmed' | 'updated';
  confidence: number;
  explanation: string;
};


const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Simple rate limiting
const RATE_LIMIT_INTERVAL = 60000; // 1 minute
let lastApiCallTime = 0;

export default function GraphQLDiffAnalyzer() {
  const [oldQuery, setOldQuery] = useState('');
  const [newQuery, setNewQuery] = useState('');
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const extractFields = useCallback((query: string): string[] => {
    if (!query.trim()) {
      throw new Error('Empty query');
    }
    const ast = parse(query);
    const fields: string[] = [];

    visit(ast, {
      Field: {
        enter(node: FieldNode, key, parent, path, ancestors: any) {
          const fieldPath = ancestors
            .filter(ancestor => ancestor.kind === 'Field')
            .map(ancestor => (ancestor as FieldNode).name.value)
            .concat(node.name.value)
            .join('.');
          fields.push(fieldPath);
        }
      }
    });

    return fields;
  }, []);

  const getAIAnalysis = useCallback(async (oldFields: string[], newFields: string[]): Promise<Mapping[]> => {
    const currentTime = Date.now();
    if (currentTime - lastApiCallTime < RATE_LIMIT_INTERVAL) {
      throw new Error('Rate limit exceeded. Please wait before trying again.');
    }

    const prompt = `
      Analyze the following GraphQL schema changes:
      
      Old fields:
      ${oldFields.join('\n')}
      
      New fields:
      ${newFields.join('\n')}
      
      Provide a JSON array of mappings with the following structure:
      [
        {
          "oldField": "field name from old schema",
          "newField": "corresponding field name in new schema or empty string if missing",
          "status": "suggested" or "missing",
          "confidence": number between 0 and 1,
          "explanation": "Brief explanation of the mapping or change"
        },
        ...
      ]
      
      Consider potential field renamings, structural changes, and provide explanations for each mapping.
    `;

    try {
      
      const response:any = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        
      });
      console.log('ki',response);
      lastApiCallTime = currentTime;
      const aiSuggestions = JSON.parse(response.choices[0].message.content || '[]');
      return aiSuggestions;
      
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw error;
    }
  }, []);

  const analyzeDiff = useCallback(async () => {
    setError(null);
    setIsAnalyzing(true);
    try {
      const oldFields = extractFields(oldQuery);
      const newFields = extractFields(newQuery);

      const aiAnalysis = await getAIAnalysis(oldFields, newFields);
      setMappings(aiAnalysis);
    } catch (error: any) {
      console.error('Error analyzing GraphQL queries:', error);
      setError(error.message || 'An error occurred while analyzing the queries.');
      setMappings([]);
    } finally {
      setIsAnalyzing(false);
    }
  }, [oldQuery, newQuery, extractFields, getAIAnalysis]);

  const confirmMapping = useCallback((index: number) => {
    setMappings(prevMappings => {
      const updatedMappings = [...prevMappings];
      updatedMappings[index].status = 'confirmed';
      return updatedMappings;
    });
  }, []);

  const updateMapping = useCallback((index: number, newField: string) => {
    setMappings(prevMappings => {
      const updatedMappings = [...prevMappings];
      updatedMappings[index].newField = newField;
      updatedMappings[index].status = 'updated';
      return updatedMappings;
    });
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">AI-Powered GraphQL Diff Analyzer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="old-query" className="block text-sm font-medium text-gray-700 mb-2">
            Old Query
          </label>
          <textarea
            id="old-query"
            className="w-full h-40 p-2 border border-gray-300 rounded-md"
            placeholder="Paste your old GraphQL query here"
            value={oldQuery}
            onChange={(e) => setOldQuery(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new-query" className="block text-sm font-medium text-gray-700 mb-2">
            New Query
          </label>
          <textarea
            id="new-query"
            className="w-full h-40 p-2 border border-gray-300 rounded-md"
            placeholder="Paste your new GraphQL query here"
            value={newQuery}
            onChange={(e) => setNewQuery(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={analyzeDiff}
        disabled={isAnalyzing}
        className={`mb-6 px-4 py-2 rounded-md text-white ${
          isAnalyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Diff'}
      </button>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {mappings.length > 0 && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">AI-Suggested Field Mappings</h2>
          </div>
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Old Field</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Field</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Explanation</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mappings.map((mapping, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mapping.oldField}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mapping.newField || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        mapping.status === 'suggested' || mapping.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {mapping.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(mapping.confidence * 100).toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{mapping.explanation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {mapping.status === 'suggested' && (
                        <button
                          onClick={() => confirmMapping(index)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Confirm
                        </button>
                      )}
                      {mapping.status === 'missing' && (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                            placeholder="Enter new field"
                            onChange={(e) => updateMapping(index, e.target.value)}
                          />
                          <button
                            onClick={() => updateMapping(index, mapping.newField)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}