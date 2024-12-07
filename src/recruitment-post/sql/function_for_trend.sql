CREATE OR ALTER FUNCTION dbo.AnalyzeRecruitmentTrends
(
    @industryFilter NVARCHAR(1000) = NULL,
    @minRating FLOAT = 3.0,
    @startDate DATE = NULL,
    @endDate DATE = NULL,
    @levelType NVARCHAR(20) = 'Competition'  -- 'Competition' hoặc 'Attractiveness'
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
            AND (@startDate IS NULL OR rp.deadline >= @startDate)
            AND (@endDate IS NULL OR rp.deadline <= @endDate)
        GROUP BY 
            c.industry, c.name, rp.id, rp.title, 
            jd.salary, jd.experience, jd.level
        HAVING AVG(e.rating) >= @minRating
    )
    SELECT TOP 1000
        rs.industry,
        rs.CompanyName,
        rs.PostId,
        rs.JobTitle,
        rs.salary,
        rs.experience,
        rs.level,
        rs.TotalApplications,
        rs.AverageRating,
        DENSE_RANK() OVER (
            PARTITION BY rs.industry 
            ORDER BY 
                CASE @levelType
                    WHEN 'Competition' THEN rs.TotalApplications
                    WHEN 'Attractiveness' THEN rs.AverageRating
                END DESC
        ) as IndustryRank,
        CASE @levelType
            WHEN 'Competition' THEN
                CASE 
                    WHEN rs.TotalApplications > 100 THEN N'Cạnh tranh cao'
                    WHEN rs.TotalApplications > 50 THEN N'Cạnh tranh trung bình'
                    ELSE N'Cạnh tranh thấp'
                END
            WHEN 'Attractiveness' THEN
                CASE
                    WHEN rs.AverageRating >= 4.5 THEN N'Rất hấp dẫn'
                    WHEN rs.AverageRating >= 4.0 THEN N'Hấp dẫn'
                    WHEN rs.AverageRating >= 3.5 THEN N'Khá tốt'
                    ELSE N'Bình thường'
                END
        END as LevelStatus
    FROM RecruitmentStats rs
    ORDER BY 
        rs.industry,
        CASE @levelType
            WHEN 'Competition' THEN rs.TotalApplications
            WHEN 'Attractiveness' THEN rs.AverageRating
        END DESC
);

GO

-- Ví dụ cách sử dụng:
-- Hiển thị theo Competition Level
SELECT * FROM dbo.AnalyzeRecruitmentTrends(
    N'Công nghệ thông tin', 
    3.5,
    '2022-01-01',
    '2024-12-31',
    'Competition'
);

-- Hiển thị theo Attractiveness Level
SELECT * FROM dbo.AnalyzeRecruitmentTrends(
    N'Công nghệ thông tin', 
    3.5,
    '2022-01-01',
    '2024-12-31',
    'Attractiveness'
);
GO