const { getUserRole } = require('../models/authdb')
const {
  getPostComments,
  getCommentById,
  createComment,
  deleteComment,
} = require('../models/commentdb')
const status = require('../utils/status')

async function getPostCommentsController(req, res) {
  if (!(req.query && req.query.postid)) return status.BAD_REQUEST(res)

  try {
    const comments = await getPostComments(req.query.postid)
    return status.OK(res, 'Comments reterived', comments)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function getCommentController(req, res) {
  if (!(req.body && req.body.id)) return status.BAD_REQUEST(res)

  try {
    const comment = await getCommentById(req.body.id)
    return status.OK(res, 'Comment reterived', comment)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function createCommentController(req, res) {
  if (!(req.body && req.body.text && req.query && req.query.postid))
    return status.BAD_REQUEST(res)

  try {
    const comment = await createComment(
      req.query.postid,
      req.user.id,
      req.body.text,
    )
    return status.CREATED(res, comment)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function deleteCommentController(req, res) {
  try {
    const _comment = await getCommentById(req.params.id)
    const user = await getUserRole(req.user.id)
    if (_comment.authorId !== req.user.id && user.role != 'ADMIN')
      return status.FORBIDDEN(res)
    const comment = await deleteComment(req.params.id)
    return status.OK(res, 'Comment deleted', comment)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

module.exports = {
  createCommentController,
  deleteCommentController,
  getPostCommentsController,
  getCommentController,
}
