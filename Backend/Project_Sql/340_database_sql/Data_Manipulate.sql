/*-- Query for add a new character functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language*/


/* -----------------------------------LEAGUE PAGE---------------------------------*/
--Select entire table to populate page
SELECT leagueID as id, leagueName, sport, gender, level, 
DATE_FORMAT(startDate, '%b-%d-%Y') as startDate, 
DATE_FORMAT(endDate, '%b-%d-%Y') as endDate FROM leagues
--Insert new League
INSERT INTO leagues (leagueName, sport, gender, level, startDate, endDate) 
VALUES (:leagueNameInput, :sportDropdownInput, :genderDropdownInput, :levelDropdownInput, :startInput, :endInput)

/*-----------------------------------PLAYERS PAGE----------------------------------*/
--Select entire table to populate page
SELECT playerID, firstName, lastName, gender, 
    YEAR(CURDATE()) - YEAR(birthday) AS age, email AS email,
    phoneNumber as phone, DATE_FORMAT(birthday, '%Y-%m-%d') as birthday FROM players
-- search player by Name
SELECT playerID, firstName, lastName, gender, 
YEAR(CURDATE()) - YEAR(birthday) AS age, email AS email,
phoneNumber as phone, DATE_FORMAT(birthday, '%Y-%m-%d') as birthday FROM players AS P
WHERE P.firstName LIKE "%${playerName}%" OR P.lastName LIKE "%${playerName}%"
--Insert new player
INSERT INTO players (firstName, lastName, gender, birthday, email, phoneNumber) 
VALUES (:fNameInput, :lNameInput, :genderDropdownInput, :emailInput, :phoneInput)
-- update players information
UPDATE players SET firstName = :fNameInput, 
lastName= :lNameInput, gender = :genderDropdownInput, 
email = :emailInput, phoneNumber = :phoneInput WHERE id= :player_ID_from_the_update_form
-- delete a player
DELETE FROM players WHERE id = :playerID_selected_from_players_page

/*-----------------------------------TEAMS PAGE----------------------------------*/
--Select entire table to populate page
SELECT T.teamName AS name, L.sport AS sport, L.gender AS gender, T.teamID as id,
L.level AS level, T.wins as wins, T.losses as losses,
L.leagueID as leagueID, L.leagueName as leagueName FROM teams T LEFT JOIN leagues L
ON T.leagueID = L.leagueID 
--Insert new team
INSERT INTO teams (leagueID, captainID, teamName, wins, losses) VALUES 
(:leagueID_from_dropdown, :teamNameInput, :winsInput, :lossesInput)
-- update a team, only to remove team from league
UPDATE teams SET leagueID = :leagueID_from_dropdown,  
teamName = :teamNameInput, wins = :winsInput, 
losses = :lossesInput WHERE id= :team_ID_from_the_update_form

/*-----------------------------------GAMES PAGE----------------------------------*/
--Select entire table to populate page
SELECT tbl1.gameID, tbl1.leagueID, tbl1.team1ID, tbl1.team2ID, tbl1.gameLocation, 
DATE_FORMAT(tbl1.gameDate, '%b-%d-%Y') AS gameDate, 
DATE_FORMAT(tbl1.gameTime, '%h:%i %p') AS gameTime, tbl1.isPlayoff, 
tbl1.teamName AS team1, tbl2.teamName AS team2 FROM
(SELECT G.gameID, G.leagueID, G.team1ID, G.team2ID, G.gameLocation, G.gameDate, G.gameTime, 
G.isPlayoff, T.teamName FROM games G INNER JOIN
teams T ON T.teamID = G.team1ID) AS tbl1 INNER JOIN
(SELECT G.gameID, T.teamName FROM games G INNER JOIN teams T ON T.teamID = G.team2ID) AS 
tbl2 ON tbl1.gameID = tbl2.gameID;
--Insert new game
INSERT INTO games (leagueID, team1ID, team2ID, gameLocation, gameDate, gameTime, isPlayoff) 
VALUES (:leagueID_from_dropdown, :teamID_from_dropdown, :teamID_from_dropdown, :gameLocationInput, :gameDateInput, :gameTimeinput, :isPlayoffdropdown)

/*-----------------------------------ROSTERS PAGE----------------------------------*/
--Select entire table to populate page
SELECT T.teamName AS Team, CONCAT(P.firstName,' ',P.lastName) AS playerName 
FROM rosters R INNER JOIN teams T ON T.teamID = R.teamID INNER JOIN players P 
ON P.playerID = R.playerID 
-- get players by team ID
SELECT CONCAT(P.firstName, ' ', P.lastName) AS playerName, P.playerID, R.playerTeamID
FROM rosters R INNER JOIN
teams T ON T.teamID = R.teamID INNER JOIN players P ON P.playerID = R.playerID
WHERE R.teamID = :playerID_from_dropdown
--get teams by player ID
SELECT T.teamName as teamName, T.teamID as teamID, R.playerTeamID
FROM rosters R INNER JOIN
teams T ON T.teamID = R.teamID INNER JOIN players P ON P.playerID = R.playerID
WHERE P.playerID = :teamID_from_dropdown
--Insert new player into roster
INSERT INTO rosters (playerID, teamID) VALUES (:playerID_from_dropdown, :teamID_from_dropdown)
-- delete a player from roster
DELETE FROM rosters WHERE id = :playerTeamID_selected_from_rosters_page

