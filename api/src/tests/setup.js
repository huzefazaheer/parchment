require('dotenv').config({ path: '.env.test' })
const { execSync } = require('child_process')
afterAll(async () => {
  try {
    execSync('npx prisma migrate reset --force', {
      env: process.env,
      stdio: 'pipe',
    })
  } catch (error) {}
})
