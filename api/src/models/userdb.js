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
          comments: true,
          reshares: true,
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
      author: { select: { username: true, displayName: true, id: true } },
    },
  })
  return posts
}

async function getUserComments(id) {
  const comments = await prisma.comment.findMany({
    where: { authorId: id },
    include: {
      author: { select: { username: true, displayName: true, id: true } },
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
    select: { chats: true },
  })
  return users
}

module.exports = {
  getUserProfile,
  getUserPosts,
  getUserComments,
  getUserReshares,
  getUserFollowers,
  getUserFollowing,
  getUserChats,
}
