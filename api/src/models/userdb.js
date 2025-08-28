const prisma = require('./prisma')

async function getUserProfile(id) {
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      username: true,
      displayName: true,
      photo: true,
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
      backdrop: true,
    },
  })
  return user
}

async function getSelfProfile(id) {
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  })
  return user
}

async function getUserPosts(id) {
  const posts = await prisma.post.findMany({
    where: { authorId: id },
    include: {
      author: {
        select: { username: true, displayName: true, id: true, photo: true },
      },
    },
  })
  return posts
}

async function getUserComments(id) {
  const comments = await prisma.comment.findMany({
    where: { authorId: id },
    include: {
      author: {
        select: { username: true, displayName: true, id: true, photo: true },
      },
    },
  })
  return comments
}

async function getUserReshares(id) {
  const posts = await prisma.post.findMany({
    where: { resharedBy: { some: { id: id } } },
    include: {
      author: { select: { username: true, displayName: true, id: true } },
    },
  })
  return posts
}

async function getUserFollowers(id) {
  const users = await prisma.user.findUnique({
    where: { id: id },
    select: { followers: true },
  })
  return users
}

async function getUserFollowing(id) {
  const users = await prisma.user.findUnique({
    where: { id: id },
    select: { following: true },
  })
  return users
}

async function getUserChats(id) {
  const users = await prisma.user.findUnique({
    where: { id: id },
    select: {
      chats: {
        include: {
          users: {
            select: {
              username: true,
              displayName: true,
              id: true,
              photo: true,
            },
          },
          lastMessage: true,
        },
      },
    },
  })
  return users
}

async function updateUserProfile(id, displayName, photo, backdrop) {
  const users = await prisma.user.update({
    where: { id: id },
    data: {
      displayName: displayName,
      backdrop: backdrop,
      photo: photo,
    },
    select: {
      displayName: true,
      backdrop: true,
      photo: true,
    },
  })
  return users
}

async function searchUsersByUsername(username) {
  const users = prisma.user.findMany({
    where: {
      username: { contains: username, mode: 'insensitive' },
      account_type: 'PUBLIC',
    },
    select: { username: true, displayName: true, id: true, photo: true },
  })
  return users
}

async function getReqStatus(senderId, receiverId) {
  const isReqSent = await prisma.followRequest.findFirst({
    where: { senderId: senderId, receiverId: receiverId },
  })
  if (isReqSent) return 'req'
  const following = await prisma.follow.findFirst({
    where: { followerId: senderId, followingId: receiverId },
  })
  if (following) return 'follow'
  return 'none'
}

module.exports = {
  getUserProfile,
  getUserPosts,
  getUserComments,
  getUserReshares,
  getUserFollowers,
  getUserFollowing,
  getUserChats,
  updateUserProfile,
  getSelfProfile,
  searchUsersByUsername,
  getReqStatus,
}
