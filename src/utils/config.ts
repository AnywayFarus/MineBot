import dotenv from 'dotenv'
import {readdirSync, writeFileSync} from "fs";

const defaultEnvVars = "DISCORD_TOKEN=\n" +
    "DISCORD_CLIENT_ID=\n" +
    "\n" +
    "MINECRAFT_RCON_IP=\n" +
    "MINECRAFT_RCON_PORT=\n" +
    "MINECRAFT_RCON_PASSWORD="

dotenv.config();

const {DISCORD_TOKEN, DISCORD_CLIENT_ID} = process.env
if (!readdirSync("./").some(file => file === ".env")) {
    writeFileSync("./.env", defaultEnvVars)
    throw new Error("Файл среды был создан, заполните переменные в нем для дальнейшей работы бота.")
}
if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) throw new Error("No critical keys are specified in the environment.")

export const config = {
    DISCORD_TOKEN, DISCORD_CLIENT_ID
}