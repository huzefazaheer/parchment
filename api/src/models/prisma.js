require('dotenv').config()
const { PrismaClient } = require('../../generated/prisma/client')

const prisma = new PrismaClient({ log: ['warn', 'error'] })
console.log('DATABASE', process.env.DATABASE_URL)

module.exports = prisma
