import { readdirSync } from "fs";
import { join } from "path";
import { Message } from "whatsapp-web.js";

const commandHandlers: { [key: string]: (args: string[], message: Message, prefix: string) => Promise<Message> } = {};

// Dynamically load commands from the commands folder
const commandsPath = join(__dirname, "../commands");
const commandFiles = readdirSync(commandsPath).filter(file => file.startsWith("get") && file.endsWith(".ts"));

(async () => {
  for (const file of commandFiles) {
    const command = await import(join(commandsPath, file));
    const commandName = file.replace("get-", "").replace(".ts", "");
    commandHandlers[commandName] = command.default;
  }
})();

export { commandHandlers };