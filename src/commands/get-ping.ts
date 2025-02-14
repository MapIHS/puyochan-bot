import { Message } from "whatsapp-web.js";

export default async (args: string[], message: Message, prefix: string): Promise<Message> => {
  return message.reply("Pong!");
}
