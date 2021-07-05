const db = require('./db')
const config = require('../config')

async function getAll(){
  const rows = await db.query(
    `SELECT leagueID as id, leagueName, sport, gender, level, 
    DATE_FORMAT(startDate, '%b-%d-%Y') as startDate, DATE_FORMAT(endDate, '%b-%d-%Y') as endDate
    FROM leagues` 
  )
  return rows
}

async function create(league) {
  console.log('creating league', league)
  const result = await db.query(
    `INSERT INTO leagues 
    (leagueName, sport, gender, level, startDate, endDate) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`,
    [
      league.leagueName, league.sport, league.gender, league.level,
      league.startDate, league.endDate
    ]
  )

  if (result.affectedRows) {
    return {...league, leagueID: result.insertId}
  } else {
    return 'Error in creating league'
  }
}

module.exports = {
  getAll,
  create
}