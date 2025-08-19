const { getUserRole } = require('../models/authdb')
const validator = require('validator')
const {
  getPosts,
  getAllPosts,
  createPost,
  getPostById,
  updatePostVisibility,
  deletePost,
} = require('../models/postdb')
const status = require('../utils/status')

async function getPostController(req, res) {
  if (!(req.body && req.body.id)) return status.BAD_REQUEST(res)
  try {
    const post = getPostById(req.body.id)
    return status.OK(res, 'Post retrevied', post)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function getPostsController(req, res) {
  try {
    const posts = await getPosts()
    return status.OK(res, 'Posts retrevied', posts)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function createPostController(req, res) {
  if (!(req.body && req.body.text)) return status.BAD_REQUEST(res)
  if (validator.isEmpty(req.body.text)) return status.BAD_REQUEST(res)
  try {
    const post = await createPost(
      req.user.id,
      req.body.text,
      req.body?.post_embed ? req.body.post_embed : '',
      req.body?.hashtags ? req.body.hashtags : [],
    )
    return status.CREATED(res, 'Post created', post)
  } catch (error) {
    console.log(error)
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function getAllPostsController(req, res) {
  try {
    const posts = await getAllPosts()
    return status.OK(res, 'Posts retrevied', posts)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function updatePostVisibilityController(req, res) {
  if (!(req.body && req.body.visibility)) return status.BAD_REQUEST(res)
  try {
    const post = await updatePostVisibility(req.params.id, req.body.visibility)
    if (post.authorId != req.user.id) return status.FORBIDDEN(res)
    return status.OK(res, 'Post visibility updated', post)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function deletePostController(req, res) {
  try {
    const _post = await getPostById(req.params.id)
    const user = await getUserRole(req.user.id)
    if (_post.authorId !== req.user.id && user.role != 'ADMIN')
      return status.FORBIDDEN(res)
    const post = await deletePost(req.params.id)
    return status.OK(res, 'Post deleted', post)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function getHashtagPostsController(req, res) {}

module.exports = {
  getPostsController,
  getAllPostsController,
  createPostController,
  getPostController,
  updatePostVisibilityController,
  deletePostController,
}
