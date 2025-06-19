module.exports = async (client, msg, text) => {
  if (text.startsWith('.quote')) {
    await client.sendMessage(msg.key.remoteJid, { text: 'Believe in yourself and hustle hard!' })
  }
}
