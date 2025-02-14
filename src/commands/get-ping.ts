import { Message } from "whatsapp-web.js";

// @CommandName ping
export default async (args: string[], message: Message, prefix: string): Promise<Message> => {
  try {
    const start = Date.now();
    const replyMessage = await message.reply(`Puyo Chan!`);
    const end = Date.now();
    const responseTime = end - start;

    return replyMessage.reply(`Ping response time: ${responseTime} ms`);
  } catch (error) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`);
  }
};
