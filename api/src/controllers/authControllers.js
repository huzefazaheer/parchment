const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const validator = require('validator')
const {
  createUser,
  getUserByUsername,
  getUserByEmail,
  getUserRole,
} = require('../models/authdb')
const status = require('../utils/status')
const signUserJwt = require('../utils/jwt')

async function createUserController(req, res) {
  if (
    !(
      req.body &&
      req.body.username &&
      req.body.password &&
      req.body.displayName &&
      req.body.email
    )
  )
    return status.BAD_REQUEST(res)

  if (
    validator.isEmpty(req.body.email) ||
    !validator.isEmail(req.body.email) ||
    validator.isEmpty(req.body.password) ||
    validator.isEmpty(req.body.username) ||
    validator.isEmpty(req.body.displayName) ||
    !validator.isStrongPassword(req.body.password)
  )
    return status.BAD_REQUEST(res)

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await createUser(
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.displayName,
    )

    const jwt = signUserJwt(user)

    return status.CREATED(res, jwt)
  } catch (error) {
    if (error.code === 'P2002') {
      return status.CONFLICT(res, error.meta.target[0])
    }

    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function loginUserWithUsernameController(req, res) {
  if (!(req.body && req.body.username && req.body.password))
    return status.BAD_REQUEST(res)

  if (validator.isEmpty(req.body.email) || validator.isEmpty(req.body.password))
    return status.BAD_REQUEST(res)

  try {
    const user = await getUserByUsername(req.body.username)
    const userIsSecure = await bcrypt.compare(req.body.password, user.password)

    if (!userIsSecure) return status.UNAUTHORIZED(res)

    const jwt = signUserJwt(user)

    return status.OK(res, 'User logged in', jwt)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function loginUserWithEmailController(req, res) {
  if (!(req.body && req.body.email && req.body.password))
    return status.BAD_REQUEST(res)
  if (
    validator.isEmpty(req.body.email) ||
    !validator.isEmail(req.body.email) ||
    validator.isEmpty(req.body.password)
  )
    return status.BAD_REQUEST(res)

  try {
    const user = await getUserByEmail(req.body.email)

    const userIsSecure = await bcrypt.compare(req.body.password, user.password)

    if (!userIsSecure) return status.UNAUTHORIZED(res)

    const jwt = signUserJwt(user)

    return status.OK(res, 'User logged in', jwt)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function updateJwtController(req, res) {
  try {
    const user = await getUserByUsername(req.user.username)

    const jwt = signUserJwt(user)

    return status.OK(res, 'User jwt updated', jwt)
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

async function isAuth(req, res, next) {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    return status.UNAUTHORIZED(res, 'No jwt provided')
  }
  const jwt = authHeader.split(' ')[1]

  jsonwebtoken.verify(jwt, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return status.UNAUTHORIZED(res, 'JWT error')
    } else {
      req.user = decoded
      next()
    }
  })
}

async function isAdmin(req, res, next) {
  if (!req.user) {
    return status.UNAUTHORIZED(res, 'You are not logged in')
  }
  try {
    const user = await getUserRole(req.user.id)
    if (user.role != ADMIN) return status.FORBIDDEN(res)
    else next()
  } catch (error) {
    return status.INTERNAL_SERVER_ERROR(res)
  }
}

module.exports = {
  createUserController,
  loginUserWithUsernameController,
  loginUserWithEmailController,
  updateJwtController,
  isAuth,
  isAdmin,
}
