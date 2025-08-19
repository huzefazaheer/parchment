const {
  getUserProfile,
  getUserPosts,
  getUserComments,
  getUserReshares,
} = require('../models/userdb')
const status = require('../utils/status')

async function getUserProfileController(req, res) {
  try {
    const user = await getUserProfile(req.params.id)
    status.OK(res, 'User profile reterived', user)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function getUserPostsController(req, res) {
  try {
    const user = await getUserPosts(req.params.id)
    status.OK(res, 'User posts reterived', user)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function getUserCommentsController(req, res) {
  try {
    const user = await getUserComments(req.params.id)
    status.OK(res, 'User comments reterived', user)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function getUserResharesController(req, res) {
  try {
    const user = await getUserReshares(req.params.id)
    status.OK(res, 'User reshares reterived', user)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

module.exports = {
  getUserCommentsController,
  getUserPostsController,
  getUserProfileController,
  getUserResharesController,
}
