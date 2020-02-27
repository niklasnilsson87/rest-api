const Hook = require('../models/Hook')
const Response = require('../responses/Response')
const fetch = require('node-fetch')

const validateUrl = async (string) => {
  try {
    await fetch(string, { method: 'POST' })
    return true
  } catch (error) {
    return error
  }
}

/**
 *
 * @route GET api/v1/hooks
 * @description Get all registered hooks
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const read = async (req, res) => {
  const hooks = await Hook.find().select('-__v')

  if (hooks >= 0) return Response._404(res, req, 'No hooks stored')

  Response._200(res, req, hooks)
}

/**
 *
 * @route POST api/v1/hooks
 * @description Register a new hook
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const add = async (req, res) => {
  const { callbackUrl } = req.body
  const { user } = req

  if (!callbackUrl) return Response._400(res, req, 'Invalid request payload')

  const hook = await Hook.findOne({ callbackUrl })
  if (hook) return Response._409(res, req, 'Callback already registered, URI must be unique')

  const validate = await validateUrl(callbackUrl)
  if (validate === true) {
    const newHook = new Hook({
      agent: user.username,
      callbackUrl: callbackUrl
    })

    await newHook.save()
    Response._201(res, req, 'Successful hook registration', newHook)
  } else {
    Response._400(res, req, validate.message)
  }
}

/**
 *
 * @route Delete api/v1/hooks/:hookID
 * @description Delete one hook
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const remove = async (req, res) => {
  const { hookID } = req.params

  try {
    const deleteAgent = await Hook.deleteOne({ _id: hookID })
    if (deleteAgent.deletedCount) {
      Response._200(res, req, 'Hook deleted')
    } else {
      Response._404(res, req, 'No hook to delete')
    }
  } catch (error) {
    Response._500(res, req, `Unsuccessful delete: ${error}`)
  }
}

module.exports = {
  read,
  add,
  remove
}
