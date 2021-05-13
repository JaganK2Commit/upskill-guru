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
-- Dumping structure for procedure upskillguru.HotSkillsByLocation
DELIMITER //
CREATE PROCEDURE `HotSkillsByLocation`(
	IN `top` int,
	IN `jobTitleKeyword` VARCHAR(255),
	IN `city` VARCHAR(255),
	IN `state` VARCHAR(255)
)
BEGIN
	IF city IS NULL OR state IS NULL THEN
		SELECT j.JobTitle, s.SkillName AS skill_name,  jobTitleKeyword, 
      CONCAT_WS(',', l.City, l.State) AS joblocation_address,l.Latitude AS lat,l.Longitude AS longi, COUNT(s.skillname) AS frequency
		FROM jobs j
		INNER JOIN jobskills js ON js.JobId= j.JobId
		INNER JOIN skills s ON js.SkillId = s.SkillId
		INNER JOIN joblocation jl ON js.JobId = jl.JobId
		INNER JOIN locations l ON jl.LocationId = l.LocationId
		WHERE lower(j.JobTitle) LIKE CONCAT('%', lower(jobTitleKeyword), '%')
	   GROUP BY  jobTitleKeyword, s.skillName
		ORDER BY  COUNT(s.skillname) DESC		
		LIMIT top;
    ELSE
    	SELECT j.JobTitle, s.SkillName AS skill_name,  jobTitleKeyword, 
      CONCAT_WS(',', l.City, l.State) AS joblocation_address,l.Latitude AS lat,l.Longitude AS longi, COUNT(s.skillname) AS frequency
		FROM jobs j
		INNER JOIN jobskills js ON js.JobId= j.JobId
		INNER JOIN skills s ON js.SkillId = s.SkillId
		INNER JOIN joblocation jl ON js.JobId = jl.JobId
		INNER JOIN locations l ON jl.LocationId = l.LocationId
		WHERE lower(j.JobTitle) LIKE CONCAT('%', lower(jobTitleKeyword), '%') AND lower(l.city) = city 
		AND lower(l.state) = state
	   GROUP BY  jobTitleKeyword, s.skillName
		ORDER BY  COUNT(s.skillname) DESC		
		LIMIT top;
	END IF;
END//
DELIMITER ;
​
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
Collapse

