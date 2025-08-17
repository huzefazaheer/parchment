const { PrismaClient } = require('../../generated/prisma/client')

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

module.exports = prisma
