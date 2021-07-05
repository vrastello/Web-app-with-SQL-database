const router = require('express').Router()
const players = require('../services/players')

router.get('/name', async (req, res, next) => {
  const playerName = req.query.playerName
  try {
    res.json(await players.searchPlayerByName(playerName))
  } catch (err) {
    console.error(`Error while searching players`, err.message)
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    res.json(await players.getAll())
  } catch (err) {
    console.error(`Error while getting players`, err.message)
    next(err)
  }
})

router.post('/', async function(req, res, next) {
  try {
    res.json(await players.create(req.body))
  } catch (err) {
    console.error(`Error while creating player`, err.message)
    next(err)
  }
})

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await players.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating player`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await players.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting player`, err.message);
    next(err);
  }
});

module.exports = router