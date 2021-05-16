CREATE TABLE `users` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(200) NOT NULL,
  `FirstName` varchar(250) NOT NULL,
  `LastName` varchar(250) DEFAULT NULL,
  `Password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `RoleId` int NOT NULL DEFAULT '2',
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `UserName` (`UserName`),
  KEY `RoleId` (`RoleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`RoleId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
