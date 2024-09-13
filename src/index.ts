const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TOKEN;

console.log(token);

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg: any) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Received your message");
});
