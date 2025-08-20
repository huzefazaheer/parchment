const { Router } = require('express')
const { isAuth } = require('../controllers/authControllers')
const {
  createFollowReqController,
  acceptFollowReqController,
  getSentReqController,
  getReceivedReqController,
} = require('../controllers/followreqControllers')

const followreqRouter = Router()

followreqRouter.post('/', isAuth, createFollowReqController)

followreqRouter.patch('/:id', isAuth, acceptFollowReqController)

followreqRouter.get('/sent', isAuth, getSentReqController)

followreqRouter.get('/received', isAuth, getReceivedReqController)

module.exports = followreqRouter
