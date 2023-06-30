import { ChatCompletionFunctions, Configuration, OpenAIApi } from "openai";
import { FunctionCall, functionCalls } from "./function-calls";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const functions: ChatCompletionFunctions[] = [
  {
    name: "check_stock_price",
    description: "check stock prices",
    parameters: {
      type: "object",
      properties: {
        symbol: {
          type: "string",
          description: "The stock symbol",
        },
      },
      required: ["symbol"],
    },
  },
];

export const createChatCompletion = async (
  content: string
): Promise<string> => {
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: [{ role: "user", content: content }],
    functions: functions,
  });

  console.log(chatCompletion.data);

  if (chatCompletion.data.choices[0].finish_reason === "function_call") {
    const functionCall = chatCompletion.data.choices[0].message?.function_call;

    const functionName = functionCall?.name as keyof FunctionCall;

    const functionArguments = JSON.parse(functionCall?.arguments as string);

    return functionCalls[functionName](functionArguments);
  } else {
    return (
      chatCompletion.data.choices[0].message?.content ??
      "Some errors have occurred."
    );
  }
};
