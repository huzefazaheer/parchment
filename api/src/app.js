require('dotenv').config()
const express = require('express')
const authRouter = require('./routes/authRoutes')
const app = express()
const PORT = process.env.PORT || 8080

const status = require('./utils/status')
const postRouter = require('./routes/postRoutes')
const commentRouter = require('./routes/commentRoutes')
const userRouter = require('./routes/userRoutes')
const followreqRouter = require('./routes/followreqRoutes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/user', userRouter)
app.use('/followreq', followreqRouter)

app.use((req, res) => {
  status.NOT_FOUND(res)
})

app.use((error, req, res, next) => {
  status.INTERNAL_SERVER_ERROR(res)
})

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT)
})
