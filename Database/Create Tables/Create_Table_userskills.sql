CREATE TABLE `userskills` (
  `SkillId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`SkillId`,`UserId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `userskills_ibfk_1` FOREIGN KEY (`SkillId`) REFERENCES `skills` (`SkillId`),
  CONSTRAINT `userskills_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
