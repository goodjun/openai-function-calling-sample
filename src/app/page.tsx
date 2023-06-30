"use client";

import { Spinner } from "@/components/spinner/spinner";
import axios from "axios";
import { useState } from "react";

const postConversation = async (content: string) => {
  try {
    const response = await axios.post("/api/conversations", { content });

    return response.data.message;
  } catch (error) {
    console.log(error);

    return "Some errors have occurred.";
  }
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);

  const [input, setInput] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && loading === false) {
      setLoading(true);

      const message = await postConversation(input);

      setLoading(false);

      setMessage(message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="md:flex md:items-center mb-5 flex-col w-128">
        <div className="w-full">
          <label className="block text-gray-600 font-bold md:mb-0 pr-4">
            Enter your command
          </label>
          <label className="block text-gray-400 font-bold md:mb-0 pr-4 pb-3 text-xs">
            press enter to send
          </label>
        </div>
        <div className="w-full">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="inline-full-name"
            type="text"
            value={input}
            onKeyDown={handleKeyDown}
            onChange={(event) => setInput(event.target.value)}
            disabled={loading}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="w-128">
        {loading && <Spinner />}
        {!loading && <p className="text-gray-800 break-words p-1">{message}</p>}
      </div>
    </main>
  );
}
