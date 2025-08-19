const prisma = require('./prisma')

async function getReceivedFollowRequests(id) {
  const followreq = await prisma.followRequest.findUnique({
    where: { receiverId: id },
  })
  return followreq
}

async function getSentFollowRequests(id) {
  const followreq = await prisma.followRequest.findUnique({
    where: { senderId: id },
  })
  return followreq
}

async function createFollowRequest(senderId, receiverId) {
  const followreq = await prisma.followRequest.create({
    data: { senderId: senderId, receiverId: receiverId },
  })
  return followreq
}

async function acceptFollowRequest(id) {
  const followreq = await prisma.followRequest.findUnique({
    where: { id: id },
  })
  const follow = await prisma.follow.create({
    data: { followerId: followreq.senderId, followingId: followreq.receiverId },
  })
  await prisma.followRequest.delete({ where: { id: followreq.id } })
}

module.exports = {
  createFollowRequest,
  acceptFollowRequest,
  getSentFollowRequests,
  getReceivedFollowRequests,
}
