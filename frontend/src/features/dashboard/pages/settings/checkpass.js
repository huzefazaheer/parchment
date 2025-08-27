import validator from 'validator'

export default function checkPassword(oldpass, newpass) {
  if (oldpass == '') return 'Please enter your password'
  if (newpass == '') return 'Please enter a new password'
  if (!validator.isStrongPassword(newpass))
    return 'Please choose a stronger password'
  if (oldpass == newpass) return 'Passwords are the same'
  return true
}
