import { Message, MessageMedia } from "whatsapp-web.js";

// @CommandName sticker
export default async (args: string[], message: Message, prefix: string): Promise<Message> => {
  try {
    if (message.hasQuotedMsg) {
      const quotedMessage: MessageMedia = await message
        .getQuotedMessage()
        .then(async (msg) => await msg.downloadMedia());

      if (!quotedMessage.mimetype.includes("image") && !quotedMessage.mimetype.includes("video")) {
        return message.reply(
          `*Fotmat Salah*: ${
            quotedMessage.mimetype.split("/")[0]
          } desu. Silahkan masukkan file berupa gambar/video.`
        );
      }

      return message.reply(quotedMessage, message.from, {
        sendMediaAsSticker: true,
        stickerAuthor: "Puyo Chan",
        stickerName: "Thanks",
      });
    }

    const media: MessageMedia = await message.downloadMedia();

    if (!media.mimetype.includes("image") && !media.mimetype.includes("video")) {
      return message.reply(
        `*Format file yang anda masukkan salah!* Silahkan masukkan file berupa gambar/video. Format file yang anda masukkan: ${
          media.mimetype.split("/")[0]
        }`
      );
    }

    return message.reply(media, message.from, {
      sendMediaAsSticker: true,
      stickerAuthor: "Puyo Chan",
      stickerName: "Thanks",
    });
  } catch (error) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`);
  }
};
