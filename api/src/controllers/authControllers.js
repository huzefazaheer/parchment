const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const {
  createUser,
  getUserByUsername,
  getUserByEmail,
} = require('../models/authdb')

async function createUserController(req, res) {
  if (
    req.body &&
    req.body.username &&
    req.body.password &&
    req.body.displayName &&
    req.body.email
  ) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = await createUser(
        req.body.username,
        req.body.email,
        hashedPassword,
        req.body.displayName,
      )

      const jwt = await jsonwebtoken.sign(user, process.env.SECRET_KEY, {
        expiresIn: '24h',
      })

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        error: 'CREATED',
        data: jwt,
      })
    } catch (error) {
      // add unique constraint handler

      res.status(500).json({
        success: false,
        message: 'Internal database error',
        error: 'INTERNAL_SERVER_ERROR',
      })
    }
  } else
    res.status(400).json({
      success: false,
      message: 'Invalid input data',
      error: 'BAD_REQUEST',
    })
}

async function loginUserWithUsernameController(req, res) {
  if (req.body && req.body.username && req.body.password) {
    try {
      const user = await getUserByUsername(req.body.username)
      const userIsSecure = await bcrypt.compare(
        req.body.password,
        user.password,
      )

      if (userIsSecure) {
        const jwt = await jsonwebtoken.sign(
          {
            username: user.username,
            password: user.password,
            email: user.email,
            displayName: user.displayName,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: '24h',
          },
        )

        res.status(200).json({
          success: true,
          message: 'User logged in successfully',
          error: 'OK',
          data: jwt,
        })
      } else {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials',
          error: 'Unauthorized ',
          data: jwt,
        })
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal database error',
        error: 'INTERNAL_SERVER_ERROR',
      })
    }
  } else
    res.status(400).json({
      success: false,
      message: 'Invalid input data',
      error: 'BAD_REQUEST',
    })
}

async function loginUserWithEmailController(req, res) {
  if (req.body && req.body.email && req.body.password) {
    try {
      const user = await getUserByEmail(req.body.email)
      const userIsSecure = await bcrypt.compare(
        req.body.password,
        user.password,
      )

      if (userIsSecure) {
        const jwt = await jsonwebtoken.sign(
          {
            username: user.username,
            password: user.password,
            email: user.email,
            displayName: user.displayName,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: '24h',
          },
        )

        res.status(200).json({
          success: true,
          message: 'User logged in successfully',
          error: 'OK',
          data: jwt,
        })
      } else {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials',
          error: 'Unauthorized ',
          data: jwt,
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'Internal database error',
        error: 'INTERNAL_SERVER_ERROR',
      })
    }
  } else
    res.status(400).json({
      success: false,
      message: 'Invalid input data',
      error: 'BAD_REQUEST',
    })
}

module.exports = {
  createUserController,
  loginUserWithUsernameController,
  loginUserWithEmailController,
}
