const { execSync } = require('child_process')

afterAll(() => {
  execSync('npx prisma db push --force-reset', {
    env: process.env,
  })
})
