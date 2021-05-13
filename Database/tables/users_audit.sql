-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.23 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for upskillguru
CREATE DATABASE IF NOT EXISTS `upskillguru` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `upskillguru`;

-- Dumping structure for table upskillguru.users_audit
CREATE TABLE IF NOT EXISTS `users_audit` (
  `UserId` int NOT NULL,
  `UserName` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `FirstName` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `LastName` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `RoleId` int NOT NULL,
  `Action` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `CreatedBy` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `CreatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table upskillguru.users_audit: ~6 rows (approximately)
DELETE FROM `users_audit`;
/*!40000 ALTER TABLE `users_audit` DISABLE KEYS */;
INSERT INTO `users_audit` (`UserId`, `UserName`, `FirstName`, `LastName`, `Password`, `RoleId`, `Action`, `CreatedBy`, `CreatedDate`) VALUES
	(3, 'nileshbh1', 'Nilesh', 'Bhandarwar', 'Test@123', 1, 'Update', 'root@localhost', '2021-05-09 00:00:00'),
	(3, 'nileshbh12', 'Nilesh', 'Bhandarwar', 'Test@123', 1, 'Update', 'root@localhost', '2021-05-09 00:00:00'),
	(3, 'nileshbh123', 'Nilesh', 'Bhandarwar', 'Test@123', 1, 'Update', 'root@localhost', '2021-05-09 00:00:00'),
	(3, 'nileshbh123', 'Nilesh', 'Bhandarwar', 'Test@123', 1, 'Update', 'root@localhost', '2021-05-09 00:00:00'),
	(3, 'nileshbh124', 'Nilesh', 'Bhandarwar', 'Test@123', 1, 'Update', 'root@localhost', '2021-05-09 00:00:00'),
	(3, 'nileshbh124', 'Nilesh', 'Bhandarwar', 'Test@123', 1, 'Delete', 'root@localhost', '2021-05-09 00:00:00');
/*!40000 ALTER TABLE `users_audit` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
