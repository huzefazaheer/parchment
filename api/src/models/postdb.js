const prisma = require('./prisma')

async function getPostById(id) {
  const post = await prisma.post.findUnique({
    where: { id: id },
    include: {
      author: { select: { username: true, displayName: true, id: true } },
    },
  })
  return post
}

async function getPosts(jump = 0) {
  const posts = await prisma.post.findMany({
    where: { post_visibility: 'PUBLIC' },
    take: 20,
    skip: jump * 20,
    include: {
      author: { select: { username: true, displayName: true, id: true } },
    },
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
  const posts = await prisma.post.findMany({
    include: {
      author: { select: { username: true, displayName: true, id: true } },
    },
  })
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
    include: { author: { select: { username: true, displayName: true } } },
  })
  return posts
}

async function getPostLikes(id) {
  const post = await prisma.post.findMany({
    where: { id: id },
    select: {
      _count: {
        select: {
          likedBy: true,
        },
      },
    },
  })
  return post
}

async function likePost(postId, userId) {
  const alreadyLiked = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      likedBy: { where: { id: userId }, select: { id: true } },
    },
  })
  if (alreadyLiked.likedBy.length < 1) {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { likedBy: { connect: { id: userId } } },
    })
    return post
  } else {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { likedBy: { disconnect: { id: userId } } },
    })
    return post
  }
}

async function getPostComments(id) {
  const post = await prisma.post.findMany({
    where: { id: id },
    select: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  })
  return post
}

async function getPostReshares(id) {
  const post = await prisma.post.findMany({
    where: { id: id },
    select: {
      _count: {
        select: {
          resharedBy: true,
        },
      },
    },
  })
  return post
}

async function resharePost(postId, userId) {
  const alreadyReshared = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      resharedBy: { where: { id: userId }, select: { id: true } },
    },
  })
  if (alreadyReshared.resharedBy.length < 1) {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { resharedBy: { connect: { id: userId } } },
    })
    return post
  } else {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { resharedBy: { disconnect: { id: userId } } },
    })
    return post
  }
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
  likePost,
  getPostLikes,
  getPostComments,
  getPostReshares,
  resharePost,
}
