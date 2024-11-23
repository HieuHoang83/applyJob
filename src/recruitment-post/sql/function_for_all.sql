CREATE OR ALTER FUNCTION dbo.AnalyzeRecruitmentTrends
(
    @industryFilter NVARCHAR(1000) = NULL,
    @minRating FLOAT = 3.0
)
RETURNS TABLE
AS
RETURN
(
    WITH RecruitmentStats AS (
        SELECT 
            c.industry,
            c.name as CompanyName,
            rp.id as PostId,
            rp.title as JobTitle,
            jd.salary,
            jd.experience,
            jd.level,
            COUNT(DISTINCT rop.recordId) as TotalApplications,
            AVG(e.rating) as AverageRating
        FROM Company c
        JOIN Employer emp ON c.id = emp.companyId
        JOIN RecruitmentPost rp ON emp.id = rp.employerId
        JOIN JobDescription jd ON rp.id = jd.recruitmentPostId
        LEFT JOIN RecordOnRecruitmentPost rop ON rp.id = rop.recruitmentPostId
        LEFT JOIN Evaluation e ON rp.id = e.recruitmentPostId
        WHERE 
            (@industryFilter IS NULL OR c.industry = @industryFilter)
            AND rp.deadline >= GETDATE()
        GROUP BY 
            c.industry, c.name, rp.id, rp.title, 
            jd.salary, jd.experience, jd.level
        HAVING AVG(e.rating) >= @minRating
    )
    SELECT TOP 1000 -- Thêm TOP để cho phép ORDER BY
        rs.*,
        DENSE_RANK() OVER (PARTITION BY rs.industry 
                          ORDER BY rs.AverageRating DESC) as IndustryRank,
        CASE 
            WHEN rs.TotalApplications > 100 THEN N'Cạnh tranh cao'
            WHEN rs.TotalApplications > 50 THEN N'Cạnh tranh trung bình'
            ELSE N'Cạnh tranh thấp'
        END as CompetitionLevel,
        CASE
            WHEN rs.AverageRating >= 4.5 THEN N'Rất hấp dẫn'
            WHEN rs.AverageRating >= 4.0 THEN N'Hấp dẫn'
            WHEN rs.AverageRating >= 3.5 THEN N'Khá tốt'
            ELSE N'Bình thường'
        END as AttractivenessLevel
    FROM RecruitmentStats rs
    ORDER BY rs.industry, rs.AverageRating DESC
);

GO

-- Cách sử dụng:
 SELECT * FROM dbo.AnalyzeRecruitmentTrends(N'Công nghệ thông tin', 3.5);
GO