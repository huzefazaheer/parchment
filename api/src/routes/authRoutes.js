const { Router } = require('express')

const {
  createUserController,
  loginUserWithUsernameController,
  loginUserWithEmailController,
} = require('../controllers/authControllers')

const authRouter = Router()

authRouter.post('/signup', createUserController)

authRouter.post('/login/username', loginUserWithUsernameController)

authRouter.post('/login/email', loginUserWithEmailController)

authRouter.get('/update', (req, res) => {
  res.json(req.headers)
})

module.exports = authRouter
