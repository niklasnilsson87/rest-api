const Response = {}

Response._200 = (res, req, payload) => {
  res.status(200).json({
    method: req.method,
    payload
  })
}

Response._201 = (res, req, text, payload) => {
  res.status(201).json({
    method: req.method,
    message: text,
    payload
  })
}

Response._202 = (res, req, text) => {
  res.status(202).json({
    method: req.method,
    message: text
  })
}

Response._404 = (res, req, text) => {
  res.status(404).json({
    method: req.method,
    message: text
  })
}

Response._400 = (res, req, text) => {
  res.status(400).json({
    method: req.method,
    message: text
  })
}

Response._401 = (res, req, text) => {
  res.status(400).json({
    method: req.method,
    message: text
  })
}

Response._403 = (res, req, text) => {
  res.status(403).json({
    method: req.method,
    message: text
  })
}

Response._500 = (res, req, text) => {
  res.status(500).json({
    method: req.method,
    message: text
  })
}

module.exports = Response
