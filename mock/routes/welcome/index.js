const express = require('express')
const router = express.Router()
const Welcome = require('./db').Welcome
const status = require('../../status').status

/* Get all message */
router.get('/', function(req, res, next) {
  Welcome.all((error, messages) => {
    if (error) return next(error)
    res.json(messages)
  })
})

/* Insert a message. */
router.put('/insert', function(req, res, next) {
  const { message } = req.body
  Welcome.insert(message, (error, message) => {
    if (error) return next(error)
    try {
      res.json(status.success)
    } catch(error) {
      res.json(status.failure)
    }
  })
})

/* Delete a message */
router.delete('/delete/:id', function(req, res, next) {
  const id = parseInt(req.params.id, 10)
  Welcome.delete(id, (error, message) => {
    try {
      res.json(status.success)
    } catch (error) {
      res.json(status.failure)
    }
  })
})

/* Update a message */
router.put('/update/:id', function(req, res, next) {
  const data = {
    id: parseInt(req.params.id, 10),
    message: req.body.message,
  }
  Welcome.update(data, function(error, results) {
    if (error) return next(error)
    try {
      if (this.changes === 0) res.json(status.noMatch)
      else res.json(status.success)
    } catch (error) {
      res.json(status.failure)
    }
  })
})

/* Find a message */
router.get('/find/:id', function(req, res, next) {
  const id = parseInt(req.params.id, 10)
  Welcome.find(id, (error, result) => {
    if (error) return next(error)
    try {
      res.json({ data: result })
    } catch (error) {
      if (typeof result === 'undefined') {
        res.json({ data: {} })
      } else res.json(error)
    }
  })
})

module.exports = router
