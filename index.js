import { createCompletion } from "./script"
import fs from "fs"

const variables = {
    model: "gpt-3.5-turbo",
    response_format: {type: "json_object"},
    messages: [
        {
            role: "system",
            content: [{
                type: "text",
                text: `
                        1. Generate a mock bank statement for the last 3 months. for a student account as json
                        2. 
                        `
            }]
        }
    ]
}

const generateMock = async () => {
      const val = await createCompletion(variables);
      console.dir(val.choices[0].message.content, {depth: null});
      fs.writeFile("mock.json", JSON.stringify(JSON.parse(val.choices[0].message.content), null, 2), (err) => {
          if (err) {
              console.log(err)
          }
      })
} 

generateMock()