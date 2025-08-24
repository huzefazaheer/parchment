const { Router } = require('express')
const {
  getPostsController,
  createPostController,
  getAllPostsController,
  getPostController,
  updatePostVisibilityController,
  deletePostController,
  getPostLikesController,
  likePostController,
  getPostCommentsCountController,
  getPostResharesController,
  resharePostController,
} = require('../controllers/postController')
const { isAuth, isAdmin } = require('../controllers/authControllers')
const {
  getPostCommentsController,
} = require('../controllers/commentControllers')
const { getUserResharesController } = require('../controllers/userController')

const postRouter = Router()

postRouter.get('/', getPostsController)

postRouter.post('/', isAuth, createPostController)

postRouter.get('/:id', getPostController)

postRouter.get('/:id/likes', getPostLikesController)

postRouter.get('/:id/commentscount', getPostCommentsCountController)

postRouter.get('/:id/reshares', getPostResharesController)

postRouter.post('/:id/likes', isAuth, likePostController)

postRouter.post('/:id/reshares', isAuth, resharePostController)

postRouter.get('/:id/comments', (req, res) =>
  res.redirect('/comments?postid=' + req.params.id),
)

postRouter.get('/:id/comments/:id', (req, res) =>
  res.redirect('/comments/' + req.params.id),
)

postRouter.patch('/:id/visibility', isAuth, updatePostVisibilityController)

postRouter.delete('/:id', isAuth, deletePostController)

postRouter.get('/all', isAuth, isAdmin, getAllPostsController)

module.exports = postRouter
