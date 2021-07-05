const router = require('express').Router()
const teams = require('../services/teams')

router.get('/', async (req, res, next) => {
  try {
    res.json(await teams.getAll());
  } catch (err) {
    console.error(`Error while getting teams`, err.message);
    next(err);
  }
})

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await teams.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating team`, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await teams.create(req.body))
  } catch (err) {
    console.error(`Error while creating team`, err.message)
    next(err)
  }
})


module.exports = router