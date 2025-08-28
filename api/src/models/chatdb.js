const prisma = require('./prisma')

async function getChatMessages(id) {
  const messages = await prisma.chatMessage.findMany({
    where: { chatId: id },
    include: { sender: { select: { displayName: true } } },
  })
  return messages
}

async function getChatById(id) {
  const chat = await prisma.chat.findUnique({
    where: { id: id },
    include: { users: true },
  })
  return chat
}

async function createChat(
  name,
  members = [],
  type = 'DIRECT',
  photo = 'https://cdn-icons-png.flaticon.com/512/33/33308.png',
) {
  const chat = await prisma.chat.create({
    data: {
      name: type == 'DIRECT' ? null : name,
      users: { connect: members.map((user) => ({ id: user })) },
      type: type,
      photo: photo,
    },
    include: {
      users: {
        select: { id: true, displayName: true, username: true, photo: true },
      },
    },
  })
  return chat
}

async function createMessage(text, userId, chatId) {
  const message = await prisma.chatMessage.create({
    data: {
      text: text,
      senderId: userId,
      chatId: chatId,
      lastMessageOf: { connect: { id: chatId } },
    },
  })
}

async function findChatByUsers(users) {
  const chat = await prisma.chat.findFirst({
    where: {
      type: 'DIRECT',
      users: {
        every: { id: { in: users } },
      },
    },
    select: { id: true },
  })
  return chat
}

module.exports = {
  getChatMessages,
  getChatById,
  createChat,
  createMessage,
  findChatByUsers,
}
