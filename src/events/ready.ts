import {eventData} from "./index"
import {deployCommands} from "../utils/deployCommands";
import rcon from "../utils/rcon"

export const data: eventData = {
    name: "ready",
    once: true
}

export async function execute(client) {
    console.log(`Бот ${client.user.displayName} запущен!\nИнициирую запуск обновления тел команд.`)
    const guilds = client.guilds.cache.map(guild => guild.id) as Array<string>
    for (const guild of guilds) {
        await deployCommands({guildId: guild})
    }
    await rcon.sendCommand("whitelist add bebra2005")
}