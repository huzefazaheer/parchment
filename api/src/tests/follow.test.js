const request = require('supertest')
const express = require('express')
const authRouter = require('../routes/authRoutes')
const userRouter = require('../routes/userRoutes')
const jsonwebtoken = require('jsonwebtoken')
const followreqRouter = require('../routes/followreqRoutes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', followreqRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)

let jwt
let jwt2
let followid
let userid

describe('POST /followreq', () => {
  it('BAD_REQUEST with id not in body', async () => {
    const res = await request(app).post('/auth/signup').send({
      password: 'RandomPassword123!',
      username: 'user11',
      displayName: 'user11',
      email: 'user11@example.com',
    })

    jwt = res.body.data

    await request(app)
      .post('/')
      .set('Authorization', 'Bearer ' + jwt)
      .expect('Content-Type', /json/)
      .expect(400)
  })

  it('CREATED with id in body', async () => {
    const res = await request(app).post('/auth/signup').send({
      password: 'RandomPassword123!',
      username: 'user12',
      displayName: 'user12',
      email: 'user12@example.com',
    })

    jwt2 = res.body.data
    userid = await jsonwebtoken.decode(jwt2).id

    const req2 = await request(app)
      .post('/')
      .set('Authorization', 'Bearer ' + jwt)
      .send({ id: userid })
      .expect('Content-Type', /json/)
      .expect(201)
    followid = req2.body.data.id
  })
})

describe('GET /followreq', () => {
  it('OK with sent request', async () => {
    const res = await request(app)
      .get('/sent')
      .set('Authorization', 'Bearer ' + jwt)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.data).toHaveLength(1)
  })

  it('OK with received request', async () => {
    const res = await request(app)
      .get('/received')
      .set('Authorization', 'Bearer ' + jwt2)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.data).toHaveLength(1)
  })
})

describe('PATCH /followreq/:id', () => {
  it('BAD_REQUEST with no id in body', async () => {
    await request(app)
      .patch('/' + followid)
      .set('Authorization', 'Bearer ' + jwt)
      .expect('Content-Type', /json/)
      .expect(400)
  })

  it('OK with user having follower', async () => {
    await request(app)
      .patch('/' + followid)
      .send({ id: followid })
      .set('Authorization', 'Bearer ' + jwt)
      .expect('Content-Type', /json/)
      .expect(200)

    const res = await request(app)
      .get('/user/' + userid + '/following')
      .set('Authorization', 'Bearer ' + jwt)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.data.following).toHaveLength(1)
  })
})
