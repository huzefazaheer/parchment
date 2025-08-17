const prisma = require('./prisma')

async function createUser(username, email, password, displayName) {
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
      displayName: displayName,
    },
    select: {
      username: true,
      email: true,
      displayName: true,
    },
  })

  return user
}

async function getUserByUsername(username) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      email: true,
      displayName: true,
      password: true,
    },
  })

  return user
}

async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      username: true,
      email: true,
      displayName: true,
      password: true,
    },
  })

  return user
}

module.exports = { createUser, getUserByUsername, getUserByEmail }
