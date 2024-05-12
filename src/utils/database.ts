import sqlite3 from "sqlite3";

sqlite3.verbose()
const db = new sqlite3.Database("minecraft.db")

interface user {
    id: number,
    discordID: string,
    minecraftName: string
}

export default class {

    static initTable() {
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS users (\n" +
                "  id INTEGER PRIMARY KEY NOT NULL,\n" +
                "  discordID TEXT NOT NULL,\n" +
                "  minecraftName TEXT NOT NULL\n" +
                ");")
        })
    }

    static getAllUsers() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users'
            db.get(sql, (err, res) => {
                if (err) {
                    console.error(err)
                    return reject(err.message);
                }
                return resolve(res)
            })
        })
    }

    static checkUser(discordID: string) {
        return new Promise((resolve, rej) => {
            const sql = 'SELECT * FROM users WHERE discordID = ?';
            db.get(sql, [discordID], (err, res) => {
                if (err) return rej("ERROR")
                return resolve(res as user)
            })
        })

    }

    static addUser(discordID: string, minecraftName: string) {
        const sql = `INSERT INTO users(discordID, minecraftName) VALUES(?, ?)`
        db.run(sql, [discordID, minecraftName])
    }

    static replaceUserName(discordID: string, minecraftName: string) {
        const sql = `UPDATE users SET minecraftName = ? WHERE discordID = ?`
        db.run(sql, [minecraftName, discordID])
    }
}