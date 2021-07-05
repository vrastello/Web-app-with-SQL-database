const router = require('express').Router()
const games = require('../services/games')

router.get('/', async (req, res, next) => {
  try {
    res.json(await games.getAll());
  } catch (err) {
    console.error(`Error while getting games`, err.message);
    next(err);
  }
})

router.post('/', async function(req, res, next) {
  try {
    res.json(await games.create(req.body))
  } catch (err) {
    console.error(`Error while creating game`, err.message)
    next(err)
  }
})


module.exports = router