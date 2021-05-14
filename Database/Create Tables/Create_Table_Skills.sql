CREATE TABLE `skills` (
  `SkillId` int NOT NULL AUTO_INCREMENT,
  `skillname` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`SkillId`),
  KEY `idx_skillname` (`skillname`)
) ENGINE=InnoDB AUTO_INCREMENT=32773 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
