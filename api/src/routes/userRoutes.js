const { Router } = require('express')

const {
  getUserProfileController,
  getUserPostsController,
  getUserCommentsController,
  getUserResharesController,
} = require('../controllers/userController')

const userRouter = Router()

userRouter.get('/:id', getUserProfileController)

userRouter.get('/:id/posts', getUserPostsController)

userRouter.get('/:id/comments', getUserCommentsController)

userRouter.get('/:id/reshares', getUserResharesController)

module.exports = userRouter
