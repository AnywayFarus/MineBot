import {CommandInteraction, GuildMember, RoleResolvable, SlashCommandBuilder} from 'discord.js'
import mDB from '../utils/database'
import rcon from '../utils/rcon'

export const data = new SlashCommandBuilder()
    .setName("wannainmine")
    .setDescription("Получение вайтлиста на указанный никнейм.")
    .addStringOption(option => option.setName("nickname")
        .setDescription("Ваш никнейм в майнкрафте.")
        .setRequired(true))

export async function execute(interaction: CommandInteraction) {
    let dID = interaction.user.id as string
    let minecraftName = interaction.options.getString("nickname")
    let member = interaction.member as GuildMember
    if ((await mDB.checkUser(dID))?.minecraftName) return interaction.reply({
        ephemeral: true,
        content: "Вы уже находитесь в вайтлисте, либо вас удалили за нарушения"
    })
    mDB.addUser(dID, minecraftName)
    rcon.addToWhiteList(minecraftName)
    await member.roles.add(interaction.guild.roles.cache.find(role => role.name === "Minecraft") as RoleResolvable)
    return interaction.reply({
        ephemeral: true,
        content: `На никнейм ${minecraftName} был выдан вайтлист. А еще мы дали вам роль!`
    })
}