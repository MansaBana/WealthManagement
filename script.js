import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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' });


export const createThread = async () => {
  const thread = await openai.beta.threads.create();
  return thread;
};

export const createMessage = async (thread, message) => {
  await openai.beta.threads.messages.create(thread.id, message);
};


export const runAssistant = async (assistant, thread, instructions) => {
  let response;


  let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
    instructions: instructions,
  });


  switch (run.status) {
    case "completed":
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      response = messages.data[0].content[0].text.value;

      break;
    case "requires_action":
      console.log(await openai.beta.threads.messages.list(run.thread_id));
      response =
        run.required_action?.submit_tool_outputs?.tool_calls[0].function;
      await openai.beta.threads.runs.cancel(thread.id, run.id);
      break;
    default:
      console.log(run.status);
      break;
  }
  console.log(response)
  return response;
};

export const retriveThread = async (thread) => {
  const myThread = await openai.beta.threads.messages.list(thread.id);
  return myThread;
};

export const createCompletion = async (veriables) => {
  const completion = await openai.chat.completions.create(veriables);
  return completion;
};
