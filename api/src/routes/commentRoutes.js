const { Router } = require('express')

const { isAuth } = require('../controllers/authControllers')
const {
  getPostCommentsController,
  createCommentController,
  getCommentController,
  deleteCommentController,
} = require('../controllers/commentControllers')

const commentRouter = Router()

commentRouter.get('/', getPostCommentsController)

commentRouter.post('/', isAuth, createCommentController)

commentRouter.get('/:id', isAuth, getCommentController)

commentRouter.delete('/:id', isAuth, deleteCommentController)

module.exports = commentRouter
