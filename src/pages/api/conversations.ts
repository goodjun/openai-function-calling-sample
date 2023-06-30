import { createChatCompletion } from "@/services/open-ai/open-ai";
import { NextApiResponse, NextApiRequest } from "next";

interface ConversationResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConversationResponse>
) {
  const { content } = req.body;

  const message = await createChatCompletion(content);

  return res.status(200).json({ message: message });
}
