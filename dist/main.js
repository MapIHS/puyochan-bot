"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const wawebjs_1 = require("./configs/wawebjs");
async function main() {
    const client = new whatsapp_web_js_1.Client(wawebjs_1.waWebJSConfig);
    client.on("qr", (qr) => {
        console.log("QR RECEIVED", qr);
        qrcode_terminal_1.default.generate(qr, { small: true });
    });
    client.on("ready", () => {
        console.log("READY");
    });
    client.on("message_create", (message) => {
        const body = message.body;
        const prefixMatch = body.match(/^[\\/!#.]/gi);
        const prefix = prefixMatch ? prefixMatch[0] : "/";
        const command = body
            .replace(prefix, "")
            .trim()
            .split(/ +/)
            .shift()?.toLowerCase() || "";
        const args = body.trim().split(/ +/).slice(1);
        if (command === "ping") {
            message.reply("pong 🏓\n" + args);
        }
    });
    client.initialize();
}
main().catch(console.error);
