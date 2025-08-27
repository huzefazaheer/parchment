const { Router } = require('express')
const { isAuth } = require('../controllers/authControllers')
const {
  createFollowReqController,
  acceptFollowReqController,
  getSentReqController,
  getReceivedReqController,
  deleteFollowReqController,
} = require('../controllers/followreqControllers')

const followreqRouter = Router()

followreqRouter.post('/', isAuth, createFollowReqController)

followreqRouter.patch('/:id', isAuth, acceptFollowReqController)

followreqRouter.delete('/:id', isAuth, deleteFollowReqController)

followreqRouter.get('/sent', isAuth, getSentReqController)

followreqRouter.get('/received', isAuth, getReceivedReqController)

module.exports = followreqRouter
