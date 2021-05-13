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

-- Dumping structure for view upskillguru.relevantjobtitles
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `relevantjobtitles` (
	`JobTitle` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`Frequency` BIGINT(19) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for view upskillguru.relevantjobtitles
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `relevantjobtitles`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `relevantjobtitles` AS select `j`.`JobTitle` AS `JobTitle`,count(`j`.`JobTitle`) AS `Frequency` from ((`userskills` `us` join `jobskills` `js` on((`js`.`SkillId` = `us`.`SkillId`))) join `jobs` `j` on((`j`.`JobId` = `js`.`JobId`))) group by `j`.`JobTitle`;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
