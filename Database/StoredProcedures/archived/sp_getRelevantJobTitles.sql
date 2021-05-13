CREATE DEFINER=`root`@`localhost` PROCEDURE `getRelevantJobTitles`(
	IN `top` int,
    IN `userId` int
)
BEGIN
SELECT JobTitle, COUNT(JobTitle) as Frequency FROM 
userskills us 
INNER JOIN jobskills js on js.SkillId = us.SkillId
INNER JOIN jobs j ON j.JobId = js.JobId
Where us.UserId = userId
GROUP BY JobTitle
ORDER BY COUNT(JobTitle) DESC
LIMIT top;
END