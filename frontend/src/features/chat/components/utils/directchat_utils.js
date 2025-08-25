export function getOtherUser(user, users) {
  const _users = users.filter((_user) => _user.id != user.id)
  return _users[0]
}
