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

-- Dumping structure for view upskillguru.jobdetails
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `jobdetails` (
	`JobId` INT(10) NOT NULL,
	`JobTitle` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`EmployerName` VARCHAR(200) NOT NULL COLLATE 'utf8mb4_general_ci',
	`LocationId` INT(10) NOT NULL,
	`City` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`State` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`skillSet` TEXT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`skillNameSet` TEXT NULL COLLATE 'utf8mb4_general_ci'
) ENGINE=MyISAM;

-- Dumping structure for view upskillguru.jobdetails
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `jobdetails`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `jobdetails` AS select `j`.`JobId` AS `JobId`,`j`.`JobTitle` AS `JobTitle`,`j`.`EmployerName` AS `EmployerName`,`jl`.`LocationId` AS `LocationId`,`l`.`City` AS `City`,`l`.`State` AS `State`,group_concat(`js`.`SkillId` order by `js`.`SkillId` ASC separator ',') AS `skillSet`,group_concat(`s`.`SkillName` order by `js`.`SkillId` ASC separator ',') AS `skillNameSet` from ((((`jobs` `j` join `joblocation` `jl` on((`jl`.`JobId` = `j`.`JobId`))) join `jobskills` `js` on((`js`.`JobId` = `j`.`JobId`))) join `skills` `s` on((`s`.`SkillId` = `js`.`SkillId`))) join `locations` `l` on((`jl`.`LocationId` = `l`.`LocationId`))) group by `j`.`JobId` order by `j`.`JobId` desc;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
