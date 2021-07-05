const router = require('express').Router()
const leagues = require('../services/leagues')

router.get('/', async (req, res, next) => {
  try {
    res.json(await leagues.getAll());
  } catch (err) {
    console.error(`Error while getting leagues`, err.message);
    next(err);
  }
})

router.post('/', async function(req, res, next) {
  try {
    res.json(await leagues.create(req.body));
  } catch (err) {
    console.error(`Error while creating league`, err.message)
    next(err)
  }
})

module.exports = router