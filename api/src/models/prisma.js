const { PrismaClient } = require('../../generated/prisma/client')

const prisma = new PrismaClient({ log: ['warn', 'error'] })

module.exports = prisma
