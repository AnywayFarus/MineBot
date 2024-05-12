import {CommandInteraction, PermissionFlagsBits, SlashCommandBuilder} from 'discord.js'


export const data = new SlashCommandBuilder()
    .setName("whitelist")
    .setDescription("Поменять пользователю никнейм в игре(в случае его ошибки).")
    .addSubcommand(command =>
        command.setName("add")
            .setDescription("Добавить пользователя в вайтлист")
            .addUserOption(opt => opt.setName("user")
                .setDescription("Пользователь в дискорде")
                .setRequired(true)
            )
            .addStringOption(opt => opt.setName("nickname")
                .setDescription("Имя аккаунта Minecraft")
                .setRequired(true)
            ))
    .addSubcommand(command =>
        command.setName("remove")
            .setDescription("Убрать пользователя из вайтлиста")
            .addUserOption(opt => opt.setName("user")
                .setDescription("Пользователь в дискорде")
                .setRequired(true)
            )
            .addBooleanOption(opt =>
                opt.setName("null")
                    .setDescription("Обнуление?(если да, то человек сможет снова попасть в ВЛ.")
            ))
    .addSubcommand(command =>
        command.setName("replace")
            .setDescription("Замена игрового никнейма")
            .addUserOption(option =>
                option.setName("user")
                    .setDescription("Сам пользователь")
                    .setRequired(true))
            .addStringOption(option =>
                option.setName("nickname")
                    .setDescription("Его новый и правильный никнейм в майнкрафте.")
                    .setRequired(true)))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export async function execute(interaction: CommandInteraction) {
    await interaction.reply("NOT WORKING HEHEHEE")
    // Discord data
    //let discordUser = interaction.options.getUser("user")
    //let discordID = discordUser.id
    // DB data
    // let minecraftName = interaction.options.getString("nickname")
    // let user = await mDB.checkUser(dID)

    // Do stuff on reowrk
}