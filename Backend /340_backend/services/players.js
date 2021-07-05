const db = require('./db')
const config = require('../config')

async function getAll(){
  const rows = await db.query(
    `SELECT playerID, firstName, lastName, gender, 
    YEAR(CURDATE()) - YEAR(birthday) AS age, email AS email,
    phoneNumber as phone, DATE_FORMAT(birthday, '%Y-%m-%d') as birthday FROM players
    `, 
  )
  return rows
}

async function searchPlayerByName(playerName) {
  const rows = await db.query(
    `SELECT playerID, firstName, lastName, gender, 
    YEAR(CURDATE()) - YEAR(birthday) AS age, email AS email,
    phoneNumber as phone, DATE_FORMAT(birthday, '%Y-%m-%d') as birthday FROM players AS P
    WHERE P.firstName LIKE "%${playerName}%" OR P.lastName LIKE "%${playerName}%"`,
  )
  return rows
}

async function create(player) {
  console.log('creating player', player)
  if (!player.phone) {
    player.phone = null
  }
  const result = await db.query(
    `INSERT INTO players 
    (firstName, lastName, gender, birthday, email, phoneNumber) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`,
    [
      player.firstName, player.lastName, player.gender,
      player.birthday, player.email, player.phone
    ]
  )

  if (result.affectedRows) {
    return {...player, playerID: result.insertId}
  } else {
    return 'Error in creating player'
  }
}

async function update(id, player){
  if (!player.phone) {
    player.phone = null
  }
  
  const result = await db.query(
    `UPDATE players 
    SET firstName=?, lastName=?, gender=?,
    birthday=?, email=?, phoneNumber=?
    WHERE playerID=?`, 
    [
      player.firstName, player.lastName, player.gender,
      player.birthday, player.email, player.phone, id
    ]
  );

  if (result.affectedRows) {
    return {...player, playerID: result.insertId}
  } else {
    return 'Error in updating player'
  }
}

async function remove(id) {
  await db.query(
    `DELETE FROM rosters WHERE playerID=?`,
    [id]
  )
  const result = await db.query(
    `DELETE FROM players WHERE playerID=?`,
    [id]
  )

  if (result.affectedRows) {
    return "Player successfully deleted"
  } else {
    return "Error deleting player"
  }
}


module.exports = {
  getAll,
  searchPlayerByName,
  create,
  update,
  remove
}