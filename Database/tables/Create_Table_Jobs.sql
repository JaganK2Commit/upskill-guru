 CREATE TABLE `jobs` (
  `JobId` int NOT NULL AUTO_INCREMENT,
  `JobTitle` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `EmployerName` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `JobDescription` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`JobId`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `UpdatedBy` (`UpdatedBy`),
  KEY `idx_jobtitle` (`JobTitle`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `roles` (`RoleId`),
  CONSTRAINT `jobs_ibfk_2` FOREIGN KEY (`UpdatedBy`) REFERENCES `roles` (`RoleId`)
) ENGINE=InnoDB AUTO_INCREMENT=32769 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


