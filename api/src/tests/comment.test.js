const request = require('supertest')
const express = require('express')
const authRouter = require('../routes/authRoutes')

const jsonwebtoken = require('jsonwebtoken')
const userRouter = require('../routes/userRoutes')
const commentRouter = require('../routes/commentRoutes')
const postRouter = require('../routes/postRoutes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', commentRouter)
app.use('/auth', authRouter)
app.use('/posts', postRouter)

let jwt
let jwt2
let postid
let commentid

describe('POST /comments', () => {
  it('BAD_REQUEST with no post query', async () => {
    const res = await request(app).post('/auth/signup').send({
      password: 'RandomPassword123!',
      username: 'user6',
      displayName: 'user6',
      email: 'user6@example.com',
    })

    jwt = res.body.data

    await request(app)
      .post('/')
      .set('Authorization', 'Bearer ' + jwt)
      .send({ text: 'Hello world' })
      .expect('Content-Type', /json/)
      .expect(400)
  })

  it('CREATED with post query and text', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        text: 'Hello world',
      })

    postid = res.body.data.id

    await request(app)
      .post('/')
      .set('Authorization', 'Bearer ' + jwt)
      .query('postid=' + postid)
      .send({ text: 'Hello world' })
      .expect('Content-Type', /json/)
      .expect(201)
  })
})

describe('GET /comments', () => {
  it('OK with post comments when post query is given', async () => {
    const res = await request(app)
      .get('/')
      .set('Authorization', 'Bearer ' + jwt)
      .query('postid=' + postid)
      .expect('Content-Type', /json/)
      .expect(200)

    commentid = res.body.data[0].id

    expect(res.body.data).toHaveLength(1)
  })
})

describe('DELETE /comments/:id', () => {
  it('FORBIDDEN when user did not create comment', async () => {
    const res1 = await request(app).post('/auth/signup').send({
      password: 'RandomPassword123!',
      username: 'user7',
      displayName: 'user7',
      email: 'user7@example.com',
    })

    jwt2 = res1.body.data

    await request(app)
      .delete('/' + commentid)
      .set('Authorization', 'Bearer ' + jwt2)
      .query('postid=' + postid)
      .expect('Content-Type', /json/)
      .expect(403)
  })

  it('OK when user created comment', async () => {
    await request(app)
      .delete('/' + commentid)
      .set('Authorization', 'Bearer ' + jwt)
      .query('postid=' + postid)
      .expect('Content-Type', /json/)
      .expect(403)
  })
})
