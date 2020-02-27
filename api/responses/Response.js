const Response = {}

Response._200 = (res, req, payload) => {
  res.status(200).json({
    payload,
    links: links(req)
  })
}

Response._201 = (res, req, text, payload) => {
  res.status(201).json({
    message: text,
    payload,
    links: links(req)
  })
}

Response._404 = (res, req, text) => {
  res.status(404).json({
    message: text,
    links: links(req)
  })
}

Response._400 = (res, req, text) => {
  res.status(400).json({
    message: text,
    links: links(req)
  })
}

Response._401 = (res, req, text) => {
  res.status(401).json({
    message: text,
    links: links(req)
  })
}

Response._403 = (res, req, text) => {
  res.status(403).json({
    message: text,
    links: links(req)
  })
}

Response._409 = (res, req, text) => {
  res.status(409).json({
    message: text,
    links: links(req)
  })
}

Response._500 = (res, req, text) => {
  res.status(500).json({
    message: text,
    links: links(req)
  })
}

function links (req, id) {
  if (id) {
    id = `${req.originalUrl}/${id}`
  } else {
    id = req.originalUrl
  }
  return {
    root: {
      url: `${req.protocol}://${req.headers.host}/api`,
      method: 'GET'
    },
    self: {
      url: `${req.protocol}://${req.headers.host}${id}`,
      method: req.method
    },
    subscribe: {
      url: `${req.protocol}://${req.headers.host}/api/v1/hooks`,
      methods: 'GET, POST, DELETE'
    }
  }
}

module.exports = Response
