const db = require('./db')
const config = require('../config')

async function getAll(){
  const rows = await db.query(
    `SELECT T.teamName AS name, L.sport AS sport, L.gender AS gender, T.teamID as id,
    L.level AS level, T.wins as wins, T.losses as losses,
    L.leagueID as leagueID, L.leagueName as leagueName FROM teams T LEFT JOIN leagues L
    ON T.leagueID = L.leagueID`, 
  )
  return rows
}

async function create(team) {
  console.log('creating team', team)
  const result = await db.query(
    `INSERT INTO teams 
    (leagueID, teamName, wins, losses) 
    VALUES 
    (?, ?, ?, ?)`,
    [
      team.leagueID, team.teamName,
      team.wins, team.losses
    ]
  )

  if (result.affectedRows) {
    return {...team, teamID: result.insertId}
  } else {
    return 'Error in creating team'
  }
}


async function update(id, team){

  console.log("Updating", team)
  const result = await db.query(
    `UPDATE teams SET leagueID = ?, teamName = ?, wins = ?, 
    losses = ? WHERE teamID = ?`,
    [team.leagueID, team.teamName, team.wins, team.losses, id]
  )

  if (result.affectedRows) {
    return {...team, teamID: result.insertId}
  } else {
    return 'Error in updating team'
  }
}


module.exports = {
  getAll,
  // removeFromLeague,
  create,
  update
}