import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";

const token = process.env.TOKEN;

if (!token) {
  throw new Error('Bot token is not defined')
}

const bot:TelegramBot = new TelegramBot(token, { polling: true });

const READY_PRESSED_CALLBACK = 'READY_PRESSED_CALLBACK'

bot.onText(/\/go/, (msg: Message) => {
  const chatId = msg.chat.id;

  const statusMessage = bot.sendMessage(chatId, 'les go', {
    reply_markup: {
      inline_keyboard: [
        [
          {text:'Ready', callback_data: READY_PRESSED_CALLBACK}
        ]
      ]
    }
  })
});

bot.on('callback_query', (callbackQuery:CallbackQuery) => {
  const {message} = callbackQuery
  if ( !message ) {
    return
  }
  const chatId = message.chat.id
  const messageId = message.message_id

  if ( callbackQuery.data === READY_PRESSED_CALLBACK) {
    bot.editMessageText('pressed ready', {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Ready', callback_data: READY_PRESSED_CALLBACK }
          ]
        ]
      }
    })
  }
})
