/**
 *
 * @route GET api/v1/players
 * @description Get all players
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const read = async (req, res) => {
  res.status(200).json({ message: 'view players' })
}

/**
 *
 * @route POST api/v1/players/add
 * @description Create new player
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const add = async (req, res) => {
  const { name, club, position, contractTo } = req.body
  const player = {
    name,
    club,
    position,
    contractTo
  }
  res.status(200).json({
    message: 'Created a new player',
    createdPlayer: player
  })
}

/**
 *
 * @route GET api/v1/players/:playerID
 * @description Get one player
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const single = async (req, res) => {
  const { playerID } = req.params

  res.status(200).json({
    message: 'You passed an ID',
    id: playerID
  })
}

/**
 *
 * @route PATCH api/v1/players/:playerID
 * @description Update one player
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const update = async (req, res) => {
  const { playerID } = req.params

  res.status(200).json({
    message: 'Updated player',
    id: playerID
  })
}

/**
 *
 * @route Delete api/v1/players/:playerID
 * @description Delete one player
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const remove = async (req, res) => {
  const { playerID } = req.params

  res.status(200).json({
    message: 'Deleted player',
    id: playerID
  })
}

module.exports = {
  read,
  add,
  single,
  update,
  remove
}
