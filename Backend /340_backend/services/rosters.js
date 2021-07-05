const db = require('./db')
const config = require('../config')

async function getAll(){
  const rows = await db.query(
    `SELECT T.teamName AS Team, CONCAT(P.firstName,' ',P.lastName) AS playerName 
    FROM rosters R INNER JOIN teams T ON T.teamID = R.teamID INNER JOIN players P 
    ON P.playerID = R.playerID`, 
  )
  return rows
}

async function getPlayersByTeamID(teamID) {
  const rows = await db.query(
    `SELECT CONCAT(P.firstName, ' ', P.lastName) AS playerName, P.playerID, R.playerTeamID
    FROM rosters R INNER JOIN
    teams T ON T.teamID = R.teamID INNER JOIN players P ON P.playerID = R.playerID
    WHERE R.teamID = ?`,
  [
    teamID
  ]
  )
  return rows
}

async function getTeamsByPlayerID(playerID) {
  const rows = await db.query(
    `SELECT T.teamName as teamName, T.teamID as teamID, R.playerTeamID
    FROM rosters R INNER JOIN
    teams T ON T.teamID = R.teamID INNER JOIN players P ON P.playerID = R.playerID
    WHERE P.playerID = ?`,
  [
    playerID
  ]
  )
  return rows
}

async function create(roster) {
  console.log('creating roster', roster)
  const result = await db.query(
    `INSERT INTO rosters 
    (playerID, teamID) 
    VALUES 
    (?, ?)`,
    [
      roster.playerID, roster.teamID
    ]
  )

  if (result.affectedRows) {
    return {...roster, playerTeamID: result.insertId}
  } else {
    return 'Error in creating roster'
  }
}

async function remove(id){  
  const result = await db.query(
    `DELETE FROM rosters WHERE playerTeamID=?`, 
    [id]
  );

  if (result.affectedRows) {
    return 'Deleted roster row successful'
  } else {
    return 'Error in deleting roster row'
  }
}

module.exports = {
  getAll,
  getTeamsByPlayerID,
  getPlayersByTeamID,
  create,
  remove
}