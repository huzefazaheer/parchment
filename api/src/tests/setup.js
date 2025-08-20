const { execSync } = require('child_process')
afterAll(() => {
  try {
    execSync('npx prisma migrate reset --force', {
      env: process.env,
      stdio: 'pipe',
    })
  } catch (error) {}
})
