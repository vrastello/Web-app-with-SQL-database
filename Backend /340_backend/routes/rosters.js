const router = require('express').Router()
const rosters = require('../services/rosters')

router.get('/team/:id', async (req, res, next) => {
  const teamID = req.params.id
  console.log('getting players by teamID', teamID)
  try {
    res.json(await rosters.getPlayersByTeamID(teamID));
  } catch (err) {
    console.error(`Error while getting rosters`, err.message);
    next(err);
  }
})

router.get('/player', async (req, res, next) => {
  const playerID = req.query.playerID
  console.log('getting players by playerID', playerID)
  try {
    res.json(await rosters.getTeamsByPlayerID(playerID));
  } catch (err) {
    console.error(`Error while getting rosters`, err.message);
    next(err);
  }
})

router.get('/', async (req, res, next) => {
  try {
    res.json(await rosters.getAll());
  } catch (err) {
    console.error(`Error while getting rosters`, err.message);
    next(err);
  }
})

router.post('/', async function(req, res, next) {
  try {
    res.json(await rosters.create(req.body))
  } catch (err) {
    console.error(`Error while creating roster`, err.message)
    next(err)
  }
})

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await rosters.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting roster`, err.message);
    next(err);
  }
});

module.exports = router