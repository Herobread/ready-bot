import { READY_SYMBOL } from "./constants"

export type ReadyOrNotMessage = {
    readyUsernames: string[]
}

export function parseMessage(message: string) {
    const lines = message.split("\n")

    const readyUsernames: string[] = []

    lines.forEach((line) => {
        if (line.startsWith(READY_SYMBOL)) {
            const l = line.split(" ")
            const username = l[1]

            readyUsernames.push(username)
        }
    })

    return {
        readyUsernames,
    }
}
