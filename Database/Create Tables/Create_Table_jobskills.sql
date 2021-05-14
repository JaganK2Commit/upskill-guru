 CREATE TABLE `jobskills` (
  `JobId` int NOT NULL,
  `SkillId` int NOT NULL,
  PRIMARY KEY (`JobId`,`SkillId`),
  KEY `jobskills_ibfk_2` (`SkillId`),
  CONSTRAINT `jobskills_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`JobId`),
  CONSTRAINT `jobskills_ibfk_2` FOREIGN KEY (`SkillId`) REFERENCES `skills` (`SkillId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

