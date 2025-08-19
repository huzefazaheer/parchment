const prisma = require('./prisma')

async function getChatMessages(id) {
  const messages = await prisma.chatMessage.findMany({ where: { chatId: id } })
  return messages
}

async function getChatById(id) {
  const chat = await prisma.chat.findUnique({ where: { id: id } })
  return chat
}

async function createChat(name, members = [], type = 'DIRECT') {
  const chat = await prisma.chat.create({
    data: {
      name: name,
      users: { connect: members.map((user) => ({ id: user.id })) },
      type: type,
    },
  })
  return chat
}

async function createMessage(text, userId, chatId) {
  const message = await prisma.chatMessage.create({
    data: { text: text, senderId: userId, chatId: chatId },
  })
}

module.exports = { getChatMessages, getChatById, createChat, createMessage }
