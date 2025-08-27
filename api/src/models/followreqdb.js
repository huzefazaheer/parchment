const prisma = require('./prisma')

async function getRequestById(id) {
  const followreq = await prisma.followRequest.findUnique({
    where: { id: id },
  })
  return followreq
}

async function getReceivedFollowRequests(id) {
  const followreq = await prisma.followRequest.findMany({
    where: { receiverId: id },
    include: {
      sender: {
        select: { username: true, displayName: true, id: true, photo: true },
      },
    },
  })
  return followreq
}

async function getSentFollowRequests(id) {
  const followreq = await prisma.followRequest.findMany({
    where: { senderId: id },
    include: {
      receiver: {
        select: { username: true, displayName: true, id: true, photo: true },
      },
    },
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

async function deleteRequest(id) {
  await prisma.followRequest.delete({ where: { id: id } })
}

module.exports = {
  createFollowRequest,
  acceptFollowRequest,
  getSentFollowRequests,
  getReceivedFollowRequests,
  deleteRequest,
  getRequestById,
}
