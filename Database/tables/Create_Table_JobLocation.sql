CREATE TABLE `joblocation` (
  `JobId` int NOT NULL,
  `LocationId` int NOT NULL,
  PRIMARY KEY (`JobId`,`LocationId`),
  KEY `LocationId` (`LocationId`),
  CONSTRAINT `joblocation_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`JobId`),
  CONSTRAINT `joblocation_ibfk_2` FOREIGN KEY (`LocationId`) REFERENCES `locations` (`LocationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

