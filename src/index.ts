import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api"
import { READY_SYMBOL } from "./constants"
import { generateReadyOrNotMessage } from "./generateReadyOrNotMessage"
import { parseMessage } from "./parser"

const token = process.env.TOKEN

if (!token) {
    throw new Error("Bot token is not defined")
}

const bot: TelegramBot = new TelegramBot(token, { polling: true })

const READY_PRESSED_CALLBACK = "READY_PRESSED_CALLBACK"

const options: TelegramBot.SendMessageOptions = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Ready", callback_data: READY_PRESSED_CALLBACK }],
        ],
    },
}

bot.onText(/\/go/, async (msg: Message) => {
    const chatId = msg.chat.id

    try {
        const message = await bot.sendMessage(
            chatId,
            generateReadyOrNotMessage({ readyUsernames: [] }),
            options
        )

        await bot.pinChatMessage(chatId, message.message_id)

        console.log("Message pinned successfully")
    } catch (error) {
        console.error("Failed to pin the message:", error)

        await bot.sendMessage(
            chatId,
            "I don't have permission to pin messages."
        )
    }
})

bot.on("callback_query", (callbackQuery: CallbackQuery) => {
    console.log(callbackQuery)

    const { message } = callbackQuery

    if (!message) {
        return
    }

    const chatId = message.chat.id
    const messageId = message.message_id
    const messageText = message.text
    const triggeredByUsername = callbackQuery.from.username || ""

    if (callbackQuery.data === READY_PRESSED_CALLBACK) {
        const { readyUsernames } = parseMessage(messageText || "")

        if (readyUsernames.includes(triggeredByUsername)) {
            bot.answerCallbackQuery(callbackQuery.id, {
                text: "You have already pressed the 'Ready' button.",
                show_alert: true,
            })

            return
        }

        readyUsernames.push(triggeredByUsername)

        const newMessageText = generateReadyOrNotMessage({ readyUsernames })

        bot.editMessageText(newMessageText, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Ready", callback_data: READY_PRESSED_CALLBACK }],
                ],
            },
        })

        bot.sendMessage(
            chatId,
            `${READY_SYMBOL} @${triggeredByUsername} is ready.`
        )
    }
})
