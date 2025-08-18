const { Router } = require('express')

const {
  createUserController,
  loginUserWithUsernameController,
  loginUserWithEmailController,
  isAuth,
  isAdmin,
  updateJwtController,
} = require('../controllers/authControllers')

const authRouter = Router()

authRouter.post('/signup', createUserController)

authRouter.post('/login/username', loginUserWithUsernameController)

authRouter.post('/login/email', loginUserWithEmailController)

authRouter.get('/update', isAuth, updateJwtController)

module.exports = authRouter
