CREATE DEFINER=`root`@`localhost` PROCEDURE `HotSkillsByLocation`(
	IN `top` int,
    IN `jobTitleKeyword` VARCHAR(255)
)
BEGIN
SELECT j.JobTitle, s.SkillName AS skill_name, CONCAT_WS(',', l.City, l.State) AS joblocation_address,l.Latitude AS lat,l.Longitude AS longi, COUNT(l.city) AS frequency
FROM jobs j
INNER JOIN jobskills js ON js.JobId= j.JobId
INNER JOIN skills s ON js.SkillId = s.SkillId 
INNER JOIN joblocation jl ON js.JobId = jl.LocationId
INNER JOIN locations l ON jl.LocationId = l.LocationId
WHERE lower(j.JobTitle) LIKE CONCAT('%', lower(jobTitleKeyword) , '%')
GROUP BY s.SkillName, l.City, l.State,l.State,l.Latitude,l.Longitude
ORDER BY  COUNT(l.city) DESC
LIMIT top;

END