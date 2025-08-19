const {
  getUserProfile,
  getUserPosts,
  getUserComments,
  getUserReshares,
  getUserFollowers,
  getUserFollowing,
  getUserChats,
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

async function getUserFollowersController(req, res) {
  try {
    const user = await getUserFollowers(req.params.id)
    status.OK(res, 'User followers reterived', user)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function getUserFollowingController(req, res) {
  try {
    const user = await getUserFollowing(req.params.id)
    status.OK(res, 'User following reterived', user)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function getUserChatsController(req, res) {
  try {
    const chats = await getUserChats(req.user.id)
    status.OK(res, 'User chats reterived', chats)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

module.exports = {
  getUserCommentsController,
  getUserPostsController,
  getUserProfileController,
  getUserResharesController,
  getUserFollowersController,
  getUserFollowingController,
  getUserChatsController,
}
