const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function checkLoginErrorsEmail(email, password) {
  if (email == '') return 'Please fill out your email'
  if (password == '') return 'Please enter your password'
  if (!emailRegex.test(email)) return 'Invalid email address'
  return true
}
