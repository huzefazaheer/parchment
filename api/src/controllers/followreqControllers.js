const {
  getSentFollowRequests,
  getReceivedFollowRequests,
  createFollowRequest,
  acceptFollowRequest,
  getRequestById,
  deleteRequest,
} = require('../models/followreqdb')
const status = require('../utils/status')

async function getSentReqController(req, res) {
  try {
    const reqs = await getSentFollowRequests(req.user.id)
    status.OK(res, 'User reqs reterived', reqs)
  } catch (error) {
    console.log(error)
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function getReceivedReqController(req, res) {
  try {
    const reqs = await getReceivedFollowRequests(req.user.id)
    status.OK(res, 'User reqs reterived', reqs)
  } catch (error) {
    console.log(error)
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function createFollowReqController(req, res) {
  if (!(req.body && req.body.id)) return status.BAD_REQUEST(res)
  try {
    const request = await createFollowRequest(req.user.id, req.body.id)
    status.CREATED(res, request)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function acceptFollowReqController(req, res) {
  if (!(req.params && req.params.id)) return status.BAD_REQUEST(res)
  try {
    const request = await acceptFollowRequest(req.params.id)
    status.OK(res, 'Follow request accepted', request)
  } catch (error) {
    console.log(error)
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function deleteFollowReqController(req, res) {
  if (!(req.params && req.params.id)) return status.BAD_REQUEST(res)
  try {
    const request = await getRequestById(req.params.id)
    if (request.senderId == req.user.id || request.receiverId == req.user.id) {
      await deleteRequest(req.params.id)
      return status.OK(res, 'Follow request deleted', request)
    }
    return status.UNAUTHORIZED(res)
  } catch (error) {
    console.log(error)
    status.INTERNAL_SERVER_ERROR(res)
  }
}

module.exports = {
  createFollowReqController,
  acceptFollowReqController,
  getReceivedReqController,
  getSentReqController,
  deleteFollowReqController,
}
