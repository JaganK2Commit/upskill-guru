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

-- Dumping structure for view upskillguru.relevantskillsets
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `relevantskillsets` (
	`skillSet` TEXT NULL COLLATE 'utf8mb4_general_ci',
	`jobtitle` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci'
) ENGINE=MyISAM;

-- Dumping structure for view upskillguru.relevantskillsets
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `relevantskillsets`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `relevantskillsets` AS select `tmp`.`skillSet` AS `skillSet`,`tmp`.`jobtitle` AS `jobtitle` from (with `cte_jobsbyfrequency` as (select `js`.`JobId` AS `JobId`,`j`.`JobTitle` AS `jobtitle`,count(`us`.`SkillId`) AS `Frequency` from ((`jobskills` `js` join `jobs` `j` on((`js`.`JobId` = `j`.`JobId`))) left join `userskills` `us` on((`js`.`SkillId` = `us`.`SkillId`))) group by `js`.`JobId` order by count(`us`.`SkillId`) desc) select distinct group_concat(`s`.`SkillName` order by `s`.`SkillName` ASC separator ', ') AS `skillSet`,`jf`.`jobtitle` AS `jobtitle` from (((`cte_jobsbyfrequency` `jf` join `jobskills` `js` on((`jf`.`JobId` = `js`.`JobId`))) join `skills` `s` on((`js`.`SkillId` = `s`.`SkillId`))) left join `userskills` `us` on((`js`.`SkillId` = `us`.`SkillId`))) where (`us`.`SkillId` is null) group by `jf`.`JobId` order by count(`js`.`SkillId`)) `tmp`;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
