import { NO_ONE_READY_TEXT, READY_OR_NOT_TEXT, READY_SYMBOL } from "./constants"
import { ReadyOrNotMessage } from "./parser"

export function generateReadyOrNotMessage(messageData: ReadyOrNotMessage) {
    const { readyUsernames } = messageData

    let messageText = `${READY_OR_NOT_TEXT}`

    messageText += "\n\n"

    if (readyUsernames.length == 0) {
        messageText += `${NO_ONE_READY_TEXT}`

        return messageText
    }

    readyUsernames.forEach((username) => {
        messageText += `${READY_SYMBOL} ${username}\n`
    })

    return messageText
}
