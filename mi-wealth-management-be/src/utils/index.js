const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: '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' });


const createCompletion = async (veriables) => {
    const completion = await openai.chat.completions.create(veriables);
    return completion;
};

module.exports = {createCompletion}
  