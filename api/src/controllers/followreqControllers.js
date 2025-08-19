const {
  getSentFollowRequests,
  getReceivedFollowRequests,
  createFollowRequest,
  acceptFollowRequest,
} = require('../models/followreqdb')
const status = require('../utils/status')

async function getSentReqController(req, res) {
  try {
    const reqs = await getSentFollowRequests(req.user.id)
    status.OK(res, 'User reqs reterived', reqs)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function getReceivedReqController(req, res) {
  try {
    const reqs = await getReceivedFollowRequests(req.user.id)
    status.OK(res, 'User reqs reterived', reqs)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function createFollowReqController(req, res) {
  if (!(req.body && req.body.id)) return status.BAD_REQUEST(res)
  try {
    const req = await createFollowRequest(req.user.id, req.body.id)
    status.CREATED(res, req)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function acceptFollowReqController(req, res) {
  if (!(req.body && req.body.id)) return status.BAD_REQUEST(res)
  try {
    const req = await acceptFollowRequest(req.body.id)
    status.OK(res, 'Follow request accepted', req)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

module.exports = {
  createFollowReqController,
  acceptFollowReqController,
  getReceivedReqController,
  getSentReqController,
}
