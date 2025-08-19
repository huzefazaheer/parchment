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
  })
  return posts
}

async function getUserComments(id) {
  const comments = await prisma.comment.findMany({
    where: { authorId: id },
  })
  return comments
}

async function getUserReshares(id) {
  const posts = await prisma.post.findMany({ where: { resharedBy: id } })
  return posts
}

module.exports = {
  getUserProfile,
  getUserPosts,
  getUserComments,
  getUserReshares,
}
