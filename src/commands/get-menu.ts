import { Message } from "whatsapp-web.js";
import { commandHandlers } from "../services/command-handler";

export async function getMenu(args: string[], message: Message, prefix: string): Promise<Message> {
  const commands = Object.keys(commandHandlers)
    .map((command) => `${prefix}${command}`)
    .join("\n");
  return message.reply(`Menu\n\n${commands}`);
}
