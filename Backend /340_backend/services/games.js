const db = require('./db')
const config = require('../config')

async function getAll(){
  const rows = await db.query(
    `SELECT tbl1.gameID, tbl1.leagueID, tbl1.team1ID, tbl1.team2ID, tbl1.gameLocation, DATE_FORMAT(tbl1.gameDate, '%b-%d-%Y') AS gameDate, DATE_FORMAT(tbl1.gameTime, '%h:%i %p') AS gameTime, tbl1.isPlayoff, tbl1.teamName AS team1, tbl2.teamName AS team2 FROM
    (SELECT G.gameID, G.leagueID, G.team1ID, G.team2ID, G.gameLocation, G.gameDate, G.gameTime, G.isPlayoff, T.teamName FROM games G INNER JOIN
    teams T ON T.teamID = G.team1ID) AS tbl1 INNER JOIN
    (SELECT G.gameID, T.teamName FROM games G INNER JOIN teams T ON T.teamID = G.team2ID) AS tbl2 ON tbl1.gameID = tbl2.gameID;`, 
  )
  return rows
}

async function create(game) {
  console.log('creating game', game)
  const result = await db.query(
    `INSERT INTO games 
    (leagueID, team1ID, team2ID, gameLocation, gameDate, gameTime, isPlayoff) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?)`,
    [
      game.leagueID, game.team1ID, game.team2ID, 
      game.gameLocation, game.gameDate, game.gameTime, 
      game.isPlayoff
    ]
  )

  if (result.affectedRows) {
    return {...game, gameID: result.insertId}
  } else {
    return 'Error in creating game'
  }
}

module.exports = {
  getAll,
  create
}