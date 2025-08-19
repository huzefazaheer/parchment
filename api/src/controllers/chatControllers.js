const {
  getChatMessages,
  getChatById,
  createChat,
  createMessage,
} = require('../models/chatdb')
const status = require('../utils/status')

async function getChatMessagesController(req, res) {
  try {
    const msgs = await getChatMessages(req.params.id)
    return status.OK(res, 'Chat messages reterived', msgs)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR
  }
}

async function getChatController(req, res) {
  try {
    const chat = await getChatById(req.params.id)
    return status.OK(res, 'Chat reterived', chat)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR
  }
}

async function createChatController(req, res) {
  if (!(req.body && req.body.name && req.body.users && req.body.name))
    return status.BAD_REQUEST(res)
  try {
    const chat = await createChat(
      req.body.name,
      memo,
      req.body?.type,
      req.body?.photo,
    )
    return status.CREATED(res, chat)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR
  }
}

async function sendMessageController(req, res) {
  if (!(req.body && req.body.text)) return status.BAD_REQUEST(res)
  try {
    const chat = await createMessage(req.body.text, req.user.id, req.params.id)
    return status.CREATED(res, chat)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR
  }
}

module.exports = {
  getChatController,
  getChatMessagesController,
  sendMessageController,
  createChatController,
}
