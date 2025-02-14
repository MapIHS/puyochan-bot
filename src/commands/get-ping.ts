import { Message } from "whatsapp-web.js";

export async function getPing(args: string[], message: Message): Promise<Message> {
  return message.reply("Pong!");
}
