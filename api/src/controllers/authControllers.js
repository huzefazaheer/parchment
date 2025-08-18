const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const {
  createUser,
  getUserByUsername,
  getUserByEmail,
  getUserRole,
} = require('../models/authdb')
const status = require('../utils/status')

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
    status.BAD_REQUEST(res)

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await createUser(
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.displayName,
    )

    const jwt = await jsonwebtoken.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '24h',
      },
    )

    status.CREATED(res, jwt)
  } catch (error) {
    // add unique constraint handler

    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function loginUserWithUsernameController(req, res) {
  if (!(req.body && req.body.username && req.body.password))
    status.BAD_REQUEST(res)

  try {
    const user = await getUserByUsername(req.body.username)
    const userIsSecure = await bcrypt.compare(req.body.password, user.password)

    if (!userIsSecure) status.UNAUTHORIZED(res)

    const jwt = await jsonwebtoken.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
      },
      process.env.SECRET_KEY,
    )

    status.OK(res, 'User logged in', jwt)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function loginUserWithEmailController(req, res) {
  if (!(req.body && req.body.email && req.body.password))
    status.BAD_REQUEST(res)

  try {
    const user = await getUserByEmail(req.body.email)
    const userIsSecure = await bcrypt.compare(req.body.password, user.password)

    if (!userIsSecure) status.UNAUTHORIZED(res)

    const jwt = await jsonwebtoken.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '24h',
      },
    )

    status.OK(res, 'User logged in', jwt)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function updateJwtController(req, res) {
  try {
    const user = await getUserByUsername(req.user.username)
    const jwt = await jsonwebtoken.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
      },
      process.env.SECRET_KEY,
    )
    status.OK(res, 'User jwt updated', jwt)
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
  }
}

async function isAuth(req, res, next) {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    status.UNAUTHORIZED(res, 'No jwt provided')
  }
  const jwt = authHeader.split(' ')[1]

  jsonwebtoken.verify(jwt, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      status.UNAUTHORIZED(res, 'JWT error')
    } else {
      req.user = decoded
      next()
    }
  })
}

async function isAdmin(req, res, next) {
  if (!req.user) {
    status.UNAUTHORIZED(res, 'You are not logged in')
  }
  try {
    const user = await getUserRole(req.user.id)
    if (user.role != ADMIN) status.FORBIDDEN(res)
    else next()
  } catch (error) {
    status.INTERNAL_SERVER_ERROR(res)
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
