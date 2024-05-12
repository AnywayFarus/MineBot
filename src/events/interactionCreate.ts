import {ApplicationCommand, BaseInteraction} from "discord.js";

export const data = {
    name: "interactionCreate",
    once: false
}

export async function execute(interaction: BaseInteraction) {
    if (interaction.isChatInputCommand()) {
        if (!interaction.client.commands.has(interaction.commandName)) return
        try {
            const command: ApplicationCommand = (await interaction.client.commands.get(interaction.commandName)) as ApplicationCommand

            if (!command.execute) {
                console.error("Была использована команда, без функции исполнения.")
                await interaction.reply({ephemeral: true, content: "Похоже что бот немного сломался."})
            }
            await command.execute(interaction)
        } catch (e) {
            console.error(e)
            let errorText: string = "Кажется, что-то произошло не так."
            if (interaction.deferred || interaction.replied) {
                await interaction.editReply({content: errorText})
            } else {
                await interaction.reply({content: errorText, ephemeral: true})
            }
        }
    }
}