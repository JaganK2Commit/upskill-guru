DELETE FROM testdb.jobskills;
INSERT INTO testdb.jobskills (`JobId`,`SkillId`) VALUES
(100, 1),
(100, 2),
(100, 3),
(101,2),
(101,3),
(101,4),
(101,5),
(101,6),
(102,2),
(102,4),
(103,1),
(103,2),
(103,3)

INSERT INTO testdb.userskills (`userId`,`SkillId`) VALUES
(1, 2),
(1, 3)

Delete FROM testdb.skills;
INSERT INTO testdb.skills (`SkillId`,`SkillName`) VALUES
(1, 'react'),
(2, 'Node'),
(3, 'MySQL'),
(4, 'Php'),
(5, 'Power BI'),
(6, 'Manager')

SELECT * FROM testdb.userskills;
SELECT * FROM testdb.jobskills;
SElECT * FROM testdb.skills;

with CTE_JobsByFrequency AS (
Select js.JobId as JobId, COUNT(us.SkillId) as Frequency 
from testdb.jobskills js 
LEFT JOIN testdb.userskills us on js.SkillId = us.SkillId
GROUP BY JobId 
ORDER BY COUNT(us.SkillId) DESC
)

select distinct GROUP_CONCAT(s.SkillName ORDER BY s.SkillName ASC SEPARATOR ', ') as skillSet from CTE_JobsByFrequency jf
JOIN testdb.jobskills js on jf.JobId = js.JobId
JOIN testdb.skills s on js.SkillId = s.SkillId
LEFT JOIN testdb.userskills us on js.SkillId = us.SkillId
where us.SkillId is null
Group by Jf.jobId
ORDER BY COUNT(js.SkillId)

CALL getRelevantSkillSet