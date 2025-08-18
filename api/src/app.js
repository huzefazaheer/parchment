require('dotenv').config()
const express = require('express')
const authRouter = require('./routes/authRoutes')
const app = express()
const PORT = process.env.PORT || 8080

const status = require('./utils/status')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRouter)

app.use((req, res) => {
  status.NOT_FOUND(res)
})

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT)
})
