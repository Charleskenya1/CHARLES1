require('dotenv').config()
const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys')
const fs = require('fs')
const path = require('path')

const { state, saveState } = useSingleFileAuthState('./auth.json')
const client = makeWASocket({ auth: state })

client.ev.on('creds.update', saveState)
client.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text
    if (!text) return

    if (text.startsWith('.ping')) {
        await client.sendMessage(msg.key.remoteJid, { text: 'Pong 🏓 CHARLESKE XMD is alive!' })
    }

    // Load plugins
    fs.readdirSync('./plugins').forEach(file => {
        require(`./plugins/${file}`)(client, msg, text)
    })
})
