import {Rcon} from "minecraft-rcon-client";

const client = new Rcon({
    host: process.env.MINECRAFT_RCON_IP,
    port: process.env.MINECRAFT_RCON_PORT,
    password: process.env.MINECRAFT_RCON_PASSWORD
})

export default class {
    private static doRCON(callback: () => any) {
        client.connect().then(() => {
            callback()
            client.disconnect()
        })
    }

    private static sendRCON(...args: string[]) {
        return new Promise((resolve, reject) => {
            this.doRCON(() => {
                for (const argument of args) {
                    client.send(argument)
                        .then(res => {
                            resolve(res)
                        })
                        .catch(err => {
                            console.log(err)
                            reject("Error")
                        })
                }
            })
        })

    }

    static addToWhiteList(name: string) {
        return this.sendRCON(`whitelist add ${name}`)
    }

    static removeFromWhiteList(name: string) {
        return this.sendRCON(`whitelist remove ${name}`)
    }

    static replaceUserInWhiteList(oldName: string, newName: string) {
        return this.sendRCON(
            `whitelist add ${newName}`,
            `whitelist remove ${oldName}`
        )
    }

    static sendCommand(command: string) {
        return this.sendRCON(command)
    }
}