const prisma = require('./prisma')

async function createUser(username, email, password, displayName) {
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
      displayName: displayName,
      photo:
        'https://mbudazveliyoyiklaszj.supabase.co/storage/v1/object/public/profilephotos/defaultprofile.png',
      backdrop:
        'https://mbudazveliyoyiklaszj.supabase.co/storage/v1/object/public/backdrop/defaultbackdrop.png',
    },
    select: {
      id: true,
      username: true,
      email: true,
      displayName: true,
      photo: true,
      backdrop: true,
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
      id: true,
      username: true,
      email: true,
      displayName: true,
      password: true,
      photo: true,
      backdrop: true,
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
      id: true,
      username: true,
      email: true,
      displayName: true,
      password: true,
      photo: true,
      backdrop: true,
    },
  })

  return user
}

async function getUserPassword(id) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      password: true,
    },
  })

  return user
}

async function getUserRole(id) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      role: true,
    },
  })

  return user
}

async function updatePassword(id, password) {
  const user = await prisma.user.update({
    where: { id: id },
    data: {
      password: password,
    },
  })
  return user
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserByEmail,
  getUserRole,
  updatePassword,
  getUserPassword,
}
