import {ApplicationCommand, Client, Collection} from "discord.js";
import {config} from "./utils/config";
import {readdirSync} from "fs";

const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});
client.commands = new Collection<string, ApplicationCommand>()


const commandFiles: string[] = readdirSync("./src/commands").filter(file => file.endsWith(".ts") || file.endsWith(".js"))
for (const commandFile of commandFiles) {
    const command: ApplicationCommand = (await import(`./commands/${commandFile}`)) as ApplicationCommand
    client.commands.set(command.data.name, command)
}

const eventFiles: string[] = readdirSync("./src/events").filter(file => file.endsWith(".ts") || file.endsWith(".js"))
for (const eventFile of eventFiles) {
    const event: Event = (await import(`./events/${eventFile}`)) as Event
    if (event.data.once) {
        client.once(event.data.name, (...args) => event.execute(...args))

    } else {
        client.on(event.data.name, (...args) => event.execute(...args))
    }
}


client.login(config.DISCORD_TOKEN).then(() => console.log("Бот залогинился."))