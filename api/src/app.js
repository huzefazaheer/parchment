require('dotenv').config()
const express = require('express')
const authRouter = require('./routes/authRoutes')
const cors = require('cors')
const app = express()
const { createServer } = require('http')
const { Server } = require('socket.io')
const PORT = process.env.PORT || 8080

const status = require('./utils/status')
const postRouter = require('./routes/postRoutes')
const commentRouter = require('./routes/commentRoutes')
const userRouter = require('./routes/userRoutes')
const followreqRouter = require('./routes/followreqRoutes')
const chatRouter = require('./routes/chatRoutes')

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/user', userRouter)
app.use('/chats', chatRouter)
app.use('/followreq', followreqRouter)

io.on('connection', (socket) => {
  console.log('Connected')

  socket.on('userjoin', (data) => {
    socket.join(data.id)
  })

  socket.on('chatjoin', (data) => {
    socket.join(`chat-${data.chatId}`)
  })

  socket.on('messagesend', (data) => {
    io.to(`chat-${data.chatId}`).emit('message', {
      text: data.text,
      user: data.user,
    })
  })

  socket.on('createchat', (data) => {
    socket.to(data.otherId).emit('chatcreated', data)
  })

  socket.on('createpost', (data) => {
    io.emit('createpost', data)
  })

  socket.on('openpost', (postId) => {
    socket.join(`post-${postId}`)
  })

  socket.on('postcomment', (data) => {
    io.to(`post-${data.postId}`).emit('postcomment', data)
  })

  socket.on('postupdate', (data) => {
    io.emit('postupdate', data)
  })
})

app.use((req, res) => {
  status.NOT_FOUND(res)
})

app.use((error, req, res, next) => {
  console.log(error)
  status.INTERNAL_SERVER_ERROR(res)
})

httpServer.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT)
})
