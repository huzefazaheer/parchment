const {
  getChatMessages,
  getChatById,
  createChat,
  createMessage,
} = require('../models/chatdb')
const status = require('../utils/status')

async function getChatMessagesController(req, res) {
  try {
    const chat = await getChatById(req.params.id)
    if (!chat.users.some((user) => user.id === req.user.id))
      return status.FORBIDDEN(res)
    const msgs = await getChatMessages(req.params.id)
    return status.OK(res, 'Chat messages reterived', msgs)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function getChatController(req, res) {
  try {
    const chat = await getChatById(req.params.id)
    return status.OK(res, 'Chat reterived', chat)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function createChatController(req, res) {
  if (!(req.body && req.body.users)) return status.BAD_REQUEST(res)
  let users = [req.user.id, ...req.body.users]
  if (users.length < 2) return status.BAD_REQUEST(res)
  try {
    const chat = await createChat(
      req.body?.name,
      users,
      req.body?.type,
      req.body?.photo,
    )
    return status.CREATED(res, chat)
  } catch (error) {
    if ((error.code = 'P2025')) {
      return status.BAD_REQUEST(res)
    }
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function sendMessageController(req, res) {
  if (!(req.body && req.body.text)) return status.BAD_REQUEST(res)
  try {
    const chat = await createMessage(req.body.text, req.user.id, req.params.id)
    return status.CREATED(res, chat)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

module.exports = {
  getChatController,
  getChatMessagesController,
  sendMessageController,
  createChatController,
}
