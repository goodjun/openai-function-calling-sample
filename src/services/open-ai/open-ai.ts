import { ChatCompletionFunctions, Configuration, OpenAIApi } from "openai";
import { FunctionCall, functionCalls } from "./function-calls";

const configuration = new Configuration({
  apiKey: "",
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

export const createChatCompletion = async (content: string) => {
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: [{ role: "user", content: "What is the stock price of Apple?" }],
    functions: functions,
  });

  if (chatCompletion.data.choices[0].finish_reason === "function_call") {
    const functionCall = chatCompletion.data.choices[0].message?.function_call;

    const functionName = functionCall?.name as keyof FunctionCall;

    const functionArguments = JSON.parse(functionCall?.arguments as string);

    const result = await functionCalls[functionName](functionArguments);

    // TODO: return function call result
  } else {
    // TODO: return text result
  }
};
