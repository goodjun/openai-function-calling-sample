import axios from "axios";

export interface FunctionCall {
  check_stock_price(args: any): any;
}

export const functionCalls: FunctionCall = {
  check_stock_price: async (args) => {
    try {
      const { data } = await axios.get("https://api.twelvedata.com/quote", {
        params: {
          symbol: args.symbol,
          apikey: process.env.TWELVEDATA_API_KEY,
        },
      });

      console.log(data);

      return `Today (${data.datetime}), the current price of ${args.symbol} is $${data.close}`;
    } catch (error) {
      console.error(error);

      return `Some errors have occurred.`;
    }
  },
};
