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

-- Dumping structure for view upskillguru.relevantskillssets
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `relevantskillssets` (
	`JobId` INT(10) NOT NULL,
	`jobtitle` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`SkillId` INT(10) NOT NULL,
	`skillSet` TEXT NULL COLLATE 'utf8mb4_general_ci',
	`skillSetSize` BIGINT(19) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for view upskillguru.relevantskillssets
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `relevantskillssets`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `relevantskillssets` AS select `j`.`JobId` AS `JobId`,`j`.`JobTitle` AS `jobtitle`,`js`.`SkillId` AS `SkillId`,group_concat(`s`.`SkillName` order by `js`.`SkillId` ASC separator ', ') AS `skillSet`,count(`s`.`SkillId`) AS `skillSetSize` from ((`jobs` `j` join `jobskills` `js` on((`j`.`JobId` = `js`.`JobId`))) join `skills` `s` on((`s`.`SkillId` = `js`.`SkillId`))) group by `j`.`JobId` order by count(`s`.`SkillName`),count(`s`.`SkillId`) desc;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
