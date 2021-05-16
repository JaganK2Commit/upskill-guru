CREATE TABLE `locations` (
  `LocationId` int NOT NULL AUTO_INCREMENT,
  `City` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `State` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Latitude` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Longitude` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`LocationId`),
  KEY `idx_city_state` (`City`,`State`)
) ENGINE=InnoDB AUTO_INCREMENT=43192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
