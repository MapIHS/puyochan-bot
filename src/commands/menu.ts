import { Message } from "whatsapp-web.js";
import { commandHandlers, loadCommands } from "../utils/command-handler";

// @CommandName menu
export default async (args: string[], message: Message, prefix: string): Promise<Message> => {
  try {
    await loadCommands(); // Ensure commands are loaded
    const commands = Object.keys(commandHandlers)
      .map((command) => `*${prefix}${command}*`)
      .join("\n");
    return message.reply(`*Puyo Chan*\n\n*Menu:*\n${commands}`);
  } catch (error) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`);
  }
};