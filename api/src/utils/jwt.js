const jsonwebtoken = require('jsonwebtoken')

async function signUserJwt(user) {
  console.log(user)
  const jwt = await jsonwebtoken.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      photo: user.photo,
      backdrop: user.backdrop,
    },
    process.env.SECRET_KEY,
  )
  return jwt
}

module.exports = signUserJwt
