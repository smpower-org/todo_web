const express = require('express')
const router = express.Router()
const data = require('./data')

/* GET welcome data */
router.get('/', (req, res, next) => {
  res.json(data.welcome)
})

module.exports = router
