const request = require('supertest')
const express = require('express')
const postRouter = require('../routes/postRoutes')
const authRouter = require('../routes/authRoutes')
const chatRouter = require('../routes/chatRoutes')

const jsonwebtoken = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', chatRouter)
app.use('/auth', authRouter)

let jwt
let users = []
let chatid

describe('POST /chats', () => {
  it('BAD_REQUEST with not existant user', async () => {
    const res = await request(app).post('/auth/signup').send({
      password: 'RandomPassword123!',
      username: 'user3',
      displayName: 'user3',
      email: 'user3@example.com',
    })

    jwt = res.body.data

    await request(app)
      .post('/')
      .set('Authorization', 'Bearer ' + jwt)
      .send({ users: ['123'] })
      .expect('Content-Type', /json/)
      .expect(400)
  })

  it('CREATED with 1 other user', async () => {
    const res = await request(app).post('/auth/signup').send({
      password: 'RandomPassword123!',
      username: 'user4',
      displayName: 'user4',
      email: 'user4@example.com',
    })
    const user = await jsonwebtoken.decode(
      res.body.data,
      process.env.SECRET_KEY,
    )

    users.push(user.id)

    await request(app)
      .post('/')
      .set('Authorization', 'Bearer ' + jwt)
      .send({ users: users })
      .expect('Content-Type', /json/)
      .expect(201)
  })

  it('CREATED with 2 other user', async () => {
    const res = await request(app).post('/auth/signup').send({
      password: 'RandomPassword123!',
      username: 'user5',
      displayName: 'user5',
      email: 'user5@example.com',
    })
    const user = await jsonwebtoken.decode(
      res.body.data,
      process.env.SECRET_KEY,
    )
    users.push(user.id)

    const res2 = await request(app)
      .post('/')
      .set('Authorization', 'Bearer ' + jwt)
      .send({ users: users })
      .expect('Content-Type', /json/)
      .expect(201)
    chatid = res2.body.data.id
  })
})

describe('POST /chats/:id/messages', () => {
  it('CREATED with correct body', async () => {
    await request(app)
      .post('/' + chatid + '/messages')
      .set('Authorization', 'Bearer ' + jwt)
      .send({ text: 'Hello world' })
      .expect('Content-Type', /json/)
      .expect(201)
  })
})

describe('GET /chats/:id/messages', () => {
  it('OK with user in chat', async () => {
    const res = await request(app)
      .get('/' + chatid + '/messages')
      .set('Authorization', 'Bearer ' + jwt)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.data).not.toHaveLength(0)
  })
})
