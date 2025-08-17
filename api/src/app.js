require('dotenv').config()
const express = require('express')
const authRouter = require('./routes/authRoutes')
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRouter)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    error: 'NOT_FOUND',
  })
})

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT)
})
