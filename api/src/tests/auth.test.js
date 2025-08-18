const request = require('supertest')
const express = require('express')
const authRouter = require('../routes/authRoutes')

const jsonwebtoken = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', authRouter)

let jwt

describe('POST /signup', () => {
  it('BAD_REQUEST with empty body', async () => {
    await request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .expect(400)
  })

  it('BAD_REQUEST with bad email', async () => {
    await request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({
        password: 'RandomPassword123!',
        username: 'user',
        displayName: 'user',
        email: 'notanemail',
      })
      .expect(400)
  })

  it('BAD_REQUEST with bad password', async () => {
    await request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({
        password: '123',
        username: 'user',
        displayName: 'user',
        email: 'email@example.com',
      })
      .expect(400)
  })

  it('CREATED with good data', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        password: 'RandomPassword123!',
        username: 'user',
        displayName: 'user',
        email: 'email@example.com',
      })
      .expect('Content-Type', /json/)
      .expect(201)

    expect(() =>
      jsonwebtoken.verify(res.body.data, process.env.SECRET_KEY),
    ).not.toThrow()
  })
})

describe('POST /login', () => {
  it('BAD_REQUEST with empty body', async () => {
    await request(app)
      .post('/login/username')
      .expect('Content-Type', /json/)
      .expect(400)
  })

  it('OK with correct username, pass', async () => {
    const res = await request(app)
      .post('/login/username')
      .send({
        password: 'RandomPassword123!',
        username: 'user',
      })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(() =>
      jsonwebtoken.verify(res.body.data, process.env.SECRET_KEY),
    ).not.toThrow()
  })

  it('OK with correct email, pass', async () => {
    const res = await request(app)
      .post('/login/email')
      .send({
        password: 'RandomPassword123!',
        email: 'email@example.com',
      })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(() =>
      jsonwebtoken.verify(res.body.data, process.env.SECRET_KEY),
    ).not.toThrow()

    jwt = res.body.data
  })
})

describe('GET /update', () => {
  it('UNAUTORIZED with no jwt', async () => {
    await request(app).get('/update').expect('Content-Type', /json/).expect(401)
  })

  it('OK with new jwt', async () => {
    const res = await request(app)
      .get('/update')
      .set('Authorization', 'Bearer ' + jwt)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(() =>
      jsonwebtoken.verify(res.body.data, process.env.SECRET_KEY),
    ).not.toThrow()
  })
})
