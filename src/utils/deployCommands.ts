import {ApplicationCommand, REST, RESTPostAPIApplicationCommandsJSONBody, Routes} from "discord.js";
import {readdirSync} from 'fs'
import {config} from "./config";

const rest = new REST({version: "10"}).setToken(config.DISCORD_TOKEN);

type DeployCommandsProps = {
    guildId: string;
};

export async function deployCommands({guildId}: DeployCommandsProps) {
    const commands: RESTPostAPIApplicationCommandsJSONBody[] = []
    const commandFiles: string[] = readdirSync('./src/commands').filter(file => file.endsWith(".ts") || file.endsWith(".js"))

    for (let commandFile of commandFiles) {
        const command: ApplicationCommand = (await import(`../commands/${commandFile}`)) as ApplicationCommand
        const commandData = command.data.toJSON()
        commands.push(commandData)
    }
    try {
        await rest.put(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId), {
            body: commands,
        });
        console.log(`Загрузили ${commands.length} команд на ${guildId} сервер`);
    } catch (error) {
        console.error(error);
    }
}