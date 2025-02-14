import { Client, Message } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { waWebJSConfig } from "./configs/wawebjs";
import { commandHandlers } from "./utils/command-handler";

async function main() {
  const client = new Client(waWebJSConfig);

  client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("READY");
  });

  client.on("message_create", async (message: Message) => {
    if (!message.fromMe) return; // Ensure the bot does not process its own messages

    const body: string = message.body;
    const prefixMatch = body.match(/^[\\/!#.]/gi);
    const prefix: string = prefixMatch ? prefixMatch[0] : "/";
    const command: string =
      body.replace(prefix, "").trim().split(/ +/).shift()?.toLowerCase() || "";
    const args: string[] = body.trim().split(/ +/).slice(1);
    if (!body.startsWith(prefix)) return;

    for (const [pattern, handler] of Object.entries(commandHandlers)) {
      const regex = new RegExp(`^${pattern}$`, "i");
      if (regex.test(command)) {
        await handler(args, message, prefix);
        break;
      }
    }
  });

  client.initialize();
}

main().catch(console.error);
