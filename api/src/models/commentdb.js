const prisma = require('./prisma')

async function getPostComments(postId) {
  const comments = await prisma.comment.findMany({
    where: { commentedPostId: postId },
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

module.exports = {
  getPostComments,
  createComment,
  deleteComment,
  getCommentById,
}
