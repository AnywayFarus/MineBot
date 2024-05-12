import {Colors, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder} from 'discord.js';
import mDB from "../utils/database";

export const data = new SlashCommandBuilder()
    .setName("init")
    .setDescription("Создание локальной базы данных и роли.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export async function execute(interaction: CommandInteraction) {
    mDB.initTable()
    await interaction.guild.roles.fetch()
    if (!interaction.guild.roles.cache.find(role => role.name === "Minecraft")) {
        await interaction.guild.roles.create({name: "Minecraft", color: Colors.DarkBlue})
    }
    return interaction.reply({
        ephemeral: true,
        content: `Инициализация выполнена.`
    })
}