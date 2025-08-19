const { Router } = require('express')
const {
  getChatController,
  getChatMessagesController,
  createChatController,
  sendMessageController,
} = require('../controllers/chatControllers')
const { isAuth } = require('../controllers/authControllers')

const chatRouter = Router()

chatRouter.get('/:id', isAuth, getChatController)

chatRouter.get('/:id/messages', isAuth, getChatMessagesController)

chatRouter.post('/', isAuth, createChatController)

chatRouter.post('/:id/messages', isAuth, sendMessageController)

module.exports = chatRouter
