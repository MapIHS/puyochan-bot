import { get } from "http";
import { Message } from "whatsapp-web.js";
import { getPing } from "../commands/get-ping";
import { getMenu } from "../commands/get-menu";

const commandHandlers: { [key: string]: (args: string[], message: Message, prefix: string) => Promise<Message> } =
{
  "ping": getPing,
  "menu": getMenu,
};

export { commandHandlers };