const prisma = require('./prisma')

async function getPostComments(postId) {
  const comments = await prisma.comment.findMany({
    where: { commentedPostId: postId },
    include: {
      author: { select: { username: true, displayName: true, id: true } },
    },
  })
  return comments
}

async function createComment(postId, authorId, text) {
  const comment = await prisma.comment.create({
    data: { commentedPostId: postId, text: text, authorId: authorId },
  })
  return comment
}

async function deleteComment(id) {
  const comment = await prisma.comment.delete({ where: { id: id } })
  return comment
}

async function getCommentById(id) {
  const comment = await prisma.comment.findMany({
    where: { id: id },
  })
  return comment
}

async function getCommentLikes(id) {
  const comment = await prisma.comment.findMany({
    where: { id: id },
    select: {
      _count: {
        select: {
          likedBy: true,
        },
      },
    },
  })
  return comment
}

async function likeComment(commentId, userId) {
  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: { likedBy: { connect: { id: userId } } },
  })
  return comment
}

module.exports = {
  getPostComments,
  createComment,
  deleteComment,
  getCommentById,
  getCommentLikes,
  likeComment,
}
