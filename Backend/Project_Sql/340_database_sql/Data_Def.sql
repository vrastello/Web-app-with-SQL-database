/*Data Definition Queries */

DROP TABLE IF EXISTS `leagues`;

CREATE TABLE `leagues` (
  `leagueID` int(11) AUTO_INCREMENT,
  `leagueName` varchar(255) NOT NULL,
  `sport` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `startDate` date,
  `endDate` date,
  PRIMARY KEY (`leagueID`),
  UNIQUE KEY `leagueID` (`leagueID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;


LOCK TABLES `leagues` WRITE;

INSERT INTO `leagues` VALUES (1,'Rippers','Hockey','Female','Intermediate','2021-07-07', '2022-07-28'),
                              (2,'Kicky','Kickball','Co-Ed','Recreational','2021-08-07', '2022-08-28'),
                              (3,'Squirts','Beach Volleyball','Male','Competitive','2021-09-07', '2022-09-28');

UNLOCK TABLES;


DROP TABLE IF EXISTS `players`;

CREATE TABLE `players` (
  `playerID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255),
  PRIMARY KEY (`playerID`),
  UNIQUE KEY `playerID` (`playerID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;


LOCK TABLES `players` WRITE;

INSERT INTO `players` VALUES (1,'Jimmy','Lipe','Male', '1994-04-20', 'littlelipey@jim.com', '760-333-3333'),
                            (2,'BIG','VIN','Male', '1988-07-28', 'BigVinWins@aol.com', '760-333-3333'),
                            (3,'Little','K','Female', '1989-07-28', 'lk@lk.com', '760-333-3333'),
                            (4,'Summer','Silent','Female', '1987-01-28', 'ss@laol.com', '760-518-3333'),
                            (5,'Doggy','Bone','Male', '1988-11-18', 'db@gmail.com', '333-321-1234'),
                            (6,'Wayne','Greene','Male', '1928-10-18', 'wg@gmail.com', '333-321-2121'),
                            (7,'Brayana','Burnett','Female', '1991-10-18', 'bb@gmail.com', '123-321-3333'),
                            (8,'Maria','Pineda','Female', '1979-10-18', 'mp@gmail.com', '555-321-3333'),
                            (9,'Bruce','Fields','Male', '1985-03-18', 'bf@gmail.com', '333-515-3333'),
                            (10,'Lamont','Freeman','Male', '1989-04-18', 'lf@gmail.com', '333-321-3366'),
                            (11,'Laila','Goodwin','Female', '1999-05-02', 'lg@gmail.com', '888-321-3333'),
                            (12,'Lizeth','Everett','Female', '1998-09-14', 'le@gmail.com', '999-321-3333'),
                            (13,'Anthony','Walton','Male', '1988-07-18', 'aw@gmail.com', '787-321-3333'),
                            (14,'Colt','Parrish','Male', '1987-02-18', 'cp@gmail.com', '333-321-8888'),
                            (15,'Kenna','Wade','Female', '1995-06-09', 'kw@gmail.com', '541-321-3333'),
                            (16,'Aileen','Wolfe','Female', '1992-12-18', 'aw@gmail.com', '333-874-3333'),
                            (17,'Derek','Archer','Male', '1950-04-04', 'da@gmail.com', '555-321-6969'),
                            (18,'Arabella','Villarreal','Female', '1993-08-08', 'av@gmail.com', '123-321-4444');

UNLOCK TABLES;


DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `teamID` int(11) AUTO_INCREMENT,
  `leagueID` int(11),
   FOREIGN KEY (leagueID) REFERENCES leagues(leagueID) ON DELETE SET NULL,
  `teamName` varchar(255) NOT NULL,
  `wins` int(11) NOT NULL,
  `losses` int(11) NOT NULL,
  PRIMARY KEY (`teamId`),
  UNIQUE KEY `teamID` (`teamID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;



LOCK TABLES `teams` WRITE;

INSERT INTO `teams` VALUES (1,1,'Ice Queens', 0, 4), 
                          (2,1,'Score Hackers', 40, 0), 
                          (3,2,'Protein Bros', 2, 2),
                          (4,2,'Tooth Collectors', 6, 1),
                          (5,3,'Mavericks', 15, 0),
                          (6,3,'Carlsbads', 0, 15),
                          (7,1,'Dr. Freeze', 3, 0),
                          (8,2,'Ball Hogs', 0, 3),
                          (9,3,'Sharks', 22, 5);

UNLOCK TABLES;



DROP TABLE IF EXISTS `games`;

CREATE TABLE `games` (
  `gameID` int(11) NOT NULL AUTO_INCREMENT,
  `leagueID` int(11),
   FOREIGN KEY (leagueID) REFERENCES leagues(leagueID) ON DELETE SET NULL,
  `team1ID` int(11),
   FOREIGN KEY (team1ID) REFERENCES teams(teamID),
  `team2ID` int(11),
   FOREIGN KEY (team2ID) REFERENCES teams(teamID),
  `gameLocation` varchar(255) NOT NULL,
  `gameDate` date NOT NULL,
  `gameTime` time NOT NULL,
  `isPlayoff` tinyint(1),
  PRIMARY KEY (`gameID`),
  UNIQUE KEY `gameID` (`gameID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;


LOCK TABLES `games` WRITE;

INSERT INTO `games` VALUES (1,1,1,2, 'Memphis', '2021-05-03', '10:30', 0), 
                          (2,2,3,4, 'Dallas', '2021-05-01', '10:30', 1), 
                          (3,3,5,6, 'Las Vegas', '2021-05-01', '10:30', 1);

UNLOCK TABLES;



DROP TABLE IF EXISTS `rosters`;

CREATE TABLE `rosters` (
  `playerTeamID` int(11) NOT NULL AUTO_INCREMENT,
  `playerID` int(11),
   FOREIGN KEY (playerID) REFERENCES players(playerID) ON DELETE SET NULL,
  `teamID` int(11),
   FOREIGN KEY (teamID) REFERENCES teams(teamID),
  PRIMARY KEY (`playerTeamID`),
  UNIQUE KEY `playerTeamID` (`playerTeamID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;


LOCK TABLES `rosters` WRITE;

INSERT INTO `rosters` VALUES (1,1,1), 
                            (2,2,2), 
                            (3,3,2),
                            (4,4,3);

UNLOCK TABLES;