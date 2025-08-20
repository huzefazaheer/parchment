const prisma = require('./prisma')

async function getPostById(id) {
  const post = await prisma.post.findUnique({
    where: { id: id },
  })
  return post
}

async function getPosts(jump = 0) {
  const posts = await prisma.post.findMany({
    where: { post_visibility: 'PUBLIC' },
    take: 20,
    skip: jump * 20,
  })
  return posts
}

async function createPost(id, text, post_embed = '', hashtags = []) {
  const post = await prisma.post.create({
    data: {
      text: text,
      post_embed: post_embed,
      authorId: id,
      hashtags: {
        connectOrCreate: hashtags.map((hashtag) => ({
          where: { name: hashtag },
          create: { name: hashtag },
        })),
      },
    },
  })
  return post
}

async function getAllPosts() {
  const posts = await prisma.post.findUnique()
  return posts
}

async function getFollowerPosts(jump = 1) {
  const posts = await prisma.post.findMany({
    where: { post_visibility: 'FOLLOWERS' },
    take: 20,
    skip: jump * 20,
  })
  return posts
}

async function getUnlistedPosts(jump = 1) {
  const posts = await prisma.post.findMany({
    where: { post_visibility: 'UNLISTED' },
    take: 20,
    skip: jump * 20,
  })
  return posts
}

async function updatePostVisibility(id, visibility) {
  const post = await prisma.post.update({
    where: { id: id },
    data: { post_visibility: visibility },
  })
  return post
}

async function deletePost(id) {
  const post = await prisma.post.delete({ where: { id: id } })
  return post
}

async function getPostsByHashtag(tag) {
  const posts = await prisma.post.findMany({
    where: { hashtags: { some: { name: tag } } },
  })
  return posts
}

module.exports = {
  getPosts,
  getAllPosts,
  getFollowerPosts,
  getUnlistedPosts,
  createPost,
  getPostById,
  updatePostVisibility,
  deletePost,
  getPostsByHashtag,
}
