const { Router } = require('express')

const {
  getUserProfileController,
  getUserPostsController,
  getUserCommentsController,
  getUserResharesController,
  getUserFollowersController,
  getUserFollowingController,
  getUserChatsController,
  searchUserController,
  updateUserProfileController,
  getSelfProfileController,
  requestStatusController,
} = require('../controllers/userController')
const { isAuth } = require('../controllers/authControllers')

const userRouter = Router()

userRouter.get('/', searchUserController)

userRouter.get('/self', isAuth, getSelfProfileController)

userRouter.get('/chats', isAuth, getUserChatsController)

userRouter.get('/:id', getUserProfileController)

userRouter.put('/', isAuth, updateUserProfileController)

userRouter.get('/:id/followstatus', isAuth, requestStatusController)

userRouter.get('/:id/posts', getUserPostsController)

userRouter.get('/:id/comments', getUserCommentsController)

userRouter.get('/:id/reshares', getUserResharesController)

userRouter.get('/:id/followers', getUserFollowersController)

userRouter.get('/:id/following', getUserFollowingController)

module.exports = userRouter
