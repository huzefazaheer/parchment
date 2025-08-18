const jsonwebtoken = require('jsonwebtoken')

async function signUserJwt(user) {
  const jwt = await jsonwebtoken.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
    },
    process.env.SECRET_KEY,
  )
  return jwt
}

module.exports = signUserJwt
