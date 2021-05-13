CREATE DEFINER=`root`@`localhost` PROCEDURE `getRelevantSkillSet`(
	IN `top` int,
    IN `jobTitleKeyword` VARCHAR(255)
)
BEGIN
with CTE_JobsByFrequency AS (
Select js.JobId as JobId, COUNT(us.SkillId) as Frequency 
from jobskills js 
INNER JOIN jobs j ON js.JobId= j.JobId
LEFT JOIN userskills us on js.SkillId = us.SkillId
WHERE lower(j.JobTitle) LIKE CONCAT('%', lower(jobTitleKeyword) , '%')
GROUP BY JobId 
ORDER BY COUNT(us.SkillId) DESC
)

select distinct GROUP_CONCAT(s.SkillName ORDER BY s.SkillName ASC SEPARATOR ', ') as skillSet 
from CTE_JobsByFrequency jf
JOIN jobskills js on jf.JobId = js.JobId
JOIN skills s on js.SkillId = s.SkillId
LEFT JOIN userskills us on js.SkillId = us.SkillId
where us.SkillId is null
Group by Jf.jobId
ORDER BY COUNT(js.SkillId)
LIMIT top;
END