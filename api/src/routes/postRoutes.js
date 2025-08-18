const { Router } = require('express')
const {
  getPostsController,
  createPostController,
  getAllPostsController,
  getPostController,
  updatePostVisibilityController,
  deletePostController,
} = require('../controllers/postController')
const { isAuth, isAdmin } = require('../controllers/authControllers')

const postRouter = Router()

postRouter.get('/', getPostsController)

postRouter.post('/', isAuth, createPostController)

postRouter.post('/:id', getPostController)

postRouter.get('/:id/comments', (req, res) => res.redirect('/comments'))

postRouter.get('/:id/comments/:id', (req, res) =>
  res.redirect('/comments/' + req.params.id),
)

postRouter.patch('/:id/visibility', isAuth, updatePostVisibilityController)

postRouter.delete('/:id', isAuth, deletePostController)

postRouter.get('/post/all', isAuth, isAdmin, getAllPostsController)

module.exports = postRouter
