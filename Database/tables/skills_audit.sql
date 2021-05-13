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

-- Dumping structure for table upskillguru.skills_audit
CREATE TABLE IF NOT EXISTS `skills_audit` (
  `SkillId` int NOT NULL,
  `SkillName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Action` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `UpdatedBy` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table upskillguru.skills_audit: ~5 rows (approximately)
DELETE FROM `skills_audit`;
/*!40000 ALTER TABLE `skills_audit` DISABLE KEYS */;
INSERT INTO `skills_audit` (`SkillId`, `SkillName`, `Action`, `CreateDate`, `UpdateDate`, `CreatedBy`, `UpdatedBy`) VALUES
	(32768, 'TestSkill1', 'Delete', '2021-05-09 00:00:00', '2021-05-09 00:00:00', 'root@localhost', 'root@localhost'),
	(32768, 'TestSkill', 'Delete', '2021-05-09 00:00:00', '2021-05-09 00:00:00', 'root@localhost', 'root@localhost'),
	(32769, 'TestSkill', 'Update', '2021-05-09 00:00:00', '2021-05-09 00:00:00', 'root@localhost', 'root@localhost'),
	(32769, 'TestSkill1', 'Update', '2021-05-09 00:00:00', '2021-05-09 00:00:00', 'root@localhost', 'root@localhost'),
	(32769, 'TestSkill1', 'Delete', '2021-05-09 00:00:00', '2021-05-09 00:00:00', 'root@localhost', 'root@localhost');
/*!40000 ALTER TABLE `skills_audit` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
