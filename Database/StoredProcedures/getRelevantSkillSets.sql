-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.23 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------
​
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
​
​
-- Dumping database structure for upskillguru
CREATE DATABASE IF NOT EXISTS `upskillguru` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `upskillguru`;
​
-- Dumping structure for procedure upskillguru.getRelevantSkillSet
DELIMITER //
CREATE PROCEDURE `getRelevantSkillSet`(
	IN `top` INT,
	IN `jobTitleKeyword` VARCHAR(255),
	IN `userId` INT
)
BEGIN
   
​
     with CTE_JobsHavingAMatch AS (
			SELECT js.JobId as JobId,s.SkillId as JobSkillId, s.SkillName as SkillName, us.SkillId as UserSkillId FROM
			jobs j
			JOIN jobskills js ON j.JobId = js.JobId
			JOIN skills s ON s.SkillId = js.SkillId
			LEFT JOIN (Select SkillId from userskills us where UserId = userId) as us ON us.SkillId = js.SkillId
			WHERE LOWER(j.JobTitle) LIKE CONCAT('%', lower(jobTitleKeyword), '%'))
			
			SELECT Substring(SkillsToLearn, 1, 75) AS skillSet,COUNT(SkillsToLearn) AS Frequency FROM (
			SELECT jo.JobId, GROUP_CONCAT( jo.SkillName) as SkillsToLearn,
			COUNT(jo.SkillName) as SkillsToLearnCount,
			FLOOR(SUM(ji.SkillMatchCount)/COUNT(jo.JobSkillId)) as SkillMatchCount
			FROM CTE_JobsHavingAMatch jo
			JOIN (
				SELECT JobId, COUNT(UserSkillId) as SkillMatchCount FROM CTE_JobsHavingAMatch
			    WHERE UserSkillId is not NULL
			    GROUP BY JobId
				) as ji
			ON jo.JobId = ji.JobId
			 WHERe jo.UserSkillId is NULL
			GROUP BY jo.JobId
			ORDER BY SkillsToLearnCount ASC, SkillMatchCount DESC
			) AS relevantJobs
			GROUP BY SkillsToLearn
			ORDER BY COUNT(SkillsToLearn) DESC
			LIMIT top; 
 
END//
DELIMITER ;
​
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
Collapse

