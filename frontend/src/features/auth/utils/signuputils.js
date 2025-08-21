const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function checkSignupErrors(
  email,
  password,
  date,
  username,
  displayname,
) {
  if (email == '') return 'Please fill out your email'
  if (password == '') return 'Please enter your password'
  if (date == '') return 'Please enter your birth date'
  if (username == '') return 'Please enter your user name'
  if (displayname == '') return 'Please enter your display name'
  if (!emailRegex.test(email)) return 'Invalid email address'
  //   if (isNaN(new Date(date).getTime())) return 'Invalid birth date'
  return true
}
