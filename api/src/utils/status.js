function OK(res, message, data) {
  res.status(200).json({
    success: true,
    message: message,
    status: 'OK',
    data: data,
  })
}

function CREATED(res, data) {
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    status: 'CREATED',
    data: data,
  })
}

function BAD_REQUEST(res) {
  res.status(400).json({
    success: false,
    message: 'Invalid input data',
    error: 'BAD_REQUEST',
  })
}

function UNAUTHORIZED(res, message = 'Invalid credentials') {
  res.status(401).json({
    success: false,
    message: message,
    error: 'UNAUTHORIZED',
  })
}

function FORBIDDEN(res) {
  res.status(403).json({
    success: false,
    message: 'You do not have permission',
    error: 'FORBIDDEN',
  })
}

function NOT_FOUND(res) {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    error: 'NOT_FOUND',
  })
}

function CONFLICT(res, conflict) {
  res.status(409).json({
    success: false,
    message: conflict + ' already exists',
    error: 'CONFLICT',
  })
}

function INTERNAL_SERVER_ERROR(res) {
  res.status(500).json({
    success: false,
    message: 'Internal database error',
    error: 'INTERNAL_SERVER_ERROR',
  })
}

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
}
