const request = require('supertest')
const express = require('express')
const postRouter = require('../routes/postRoutes')
const authRouter = require('../routes/authRoutes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', postRouter)
app.use('/auth', authRouter)

let jwt
let id

describe('POST /posts', () => {
  it('UNAUTHORIZED with no jwt', async () => {
    await request(app).post('/').expect('Content-Type', /json/).expect(401)
  })

  it('BAD_REQUEST with empty body', async () => {
    const res = await request(app).post('/auth/signup').send({
      password: 'RandomPassword123!',
      username: 'user2',
      displayName: 'user2',
      email: 'user2@example.com',
    })

    jwt = res.body.data

    await request(app)
      .post('/')
      .set('Authorization', 'Bearer ' + jwt)
      .expect('Content-Type', /json/)
      .expect(400)
  })

  it('CREATED with good data', async () => {
    await request(app)
      .post('/')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        text: 'Hello world',
        post_embed: { type: 'img', url: 'google.com' },
        hashtags: ['devpost'],
      })
      .expect('Content-Type', /json/)
      .expect(201)
  })
})

describe('GET /posts', () => {
  it('OK with get all', async () => {
    const res = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.data).not.toHaveLength(0)
    id = res.body.data[0].id
  })

  it('OK with get by hashtag', async () => {
    const res = await request(app)
      .get('/')
      .query('tag=devpost')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.data).not.toHaveLength(0)
  })
})

describe('PACTH /posts', () => {
  it('OK with patch of users own post', async () => {
    const res = await request(app)
      .patch('/' + id + '/visibility')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        visibility: 'UNLISTED',
      })
      .expect('Content-Type', /json/)
      .expect(200)
  })

  it('OK can not see unlisted posts', async () => {
    const res = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.data).toHaveLength(0)
  })
})

describe('DELETE /posts', () => {
  it('OK with delete of users own post', async () => {
    const res = await request(app)
      .delete('/' + id)
      .set('Authorization', 'Bearer ' + jwt)
      .expect('Content-Type', /json/)
      .expect(200)
  })
})
