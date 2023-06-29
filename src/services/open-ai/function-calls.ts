import axios from "axios";

export interface FunctionCall {
  check_stock_price(args: any): any;
}

export const functionCalls: FunctionCall = {
  check_stock_price: async (args) => {
    const { data } = await axios.get("https://api.twelvedata.com/quote", {
      params: {
        symbol: args.symbol,
        apikey: "",
      },
    });

    return data;
  },
};
