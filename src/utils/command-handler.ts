import { readdirSync, watch } from "fs";
import { join } from "path";
import { Message } from "whatsapp-web.js";

let commandHandlers: { [key: string]: (args: string[], message: Message, prefix: string) => Promise<Message> } = {};

// Function to load commands
async function loadCommands() {
  commandHandlers = {};
  const commandsPath = join(__dirname, "../commands");
  const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const commandPath = join(commandsPath, file);
    delete require.cache[require.resolve(commandPath)]; // Clear the cache
    const commandModule = await import(commandPath);
    const commandContent = require('fs').readFileSync(commandPath, 'utf-8');
    const commandNameMatch = commandContent.match(/@CommandName\s+(\w+)/);
    const commandName = commandNameMatch ? commandNameMatch[1] : file.replace(".ts", "");
    commandHandlers[commandName] = commandModule.default;
  }
}

// Initial load of commands
loadCommands();

// Watch for changes in the commands folder
const commandsPath = join(__dirname, "../commands");
watch(commandsPath, (eventType, filename) => {
  if (filename && filename.endsWith(".ts")) {
    console.log(`File ${filename} changed, reloading commands...`);
    loadCommands();
  }
});

export { commandHandlers, loadCommands };