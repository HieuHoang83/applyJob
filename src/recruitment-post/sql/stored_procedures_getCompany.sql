CREATE PROCEDURE [dbo].[sp_GetRecruitmentStatsByCompany]
    @minRating FLOAT = NULL,
    @minApplications INT = NULL,
    @industry NVARCHAR(1000) = NULL
AS
BEGIN
    SELECT 
        c.name AS CompanyName,
        c.industry,
        COUNT(DISTINCT rop.recordId) AS TotalApplications,
        AVG(e.rating) AS AverageRating,
        COUNT(DISTINCT rp.id) AS TotalPosts
    FROM 
        [dbo].[Company] c
        INNER JOIN [dbo].[Employer] emp ON c.id = emp.companyId
        INNER JOIN [dbo].[RecruitmentPost] rp ON emp.id = rp.employerId
        LEFT JOIN [dbo].[RecordOnRecruitmentPost] rop ON rp.id = rop.recruitmentPostId
        LEFT JOIN [dbo].[Evaluation] e ON rp.id = e.recruitmentPostId
    WHERE 
        (@industry IS NULL OR c.industry LIKE N'%' + @industry + N'%')
    GROUP BY 
        c.name,
        c.industry
    HAVING 
        (@minRating IS NULL OR AVG(e.rating) >= @minRating)
        AND (@minApplications IS NULL OR COUNT(DISTINCT rop.recordId) >= @minApplications)
    ORDER BY 
        AVG(e.rating) DESC,
        COUNT(DISTINCT rop.recordId) DESC;
END;

-- -- Cách sử dụng:
-- -- EXEC [dbo].[sp_GetRecruitmentStatsByCompany]
-- --     @minRating = 4.0,
-- --     @minApplications = 10,
-- --     @industry = 'Technology';

-- -- Ví dụ 1: Lấy thống kê của tất cả công ty
-- EXEC [dbo].[sp_GetRecruitmentStatsByCompany]

-- -- Ví dụ 2: Lọc công ty có đánh giá từ 4.5 trở lên
-- EXEC [dbo].[sp_GetRecruitmentStatsByCompany] 
--     @minRating = 4.5

-- -- Ví dụ 3: Lọc công ty có ít nhất 1 đơn ứng tuyển trong ngành Công nghệ thông tin
-- EXEC [dbo].[sp_GetRecruitmentStatsByCompany] 
--     @minApplications = 1,
--     @industry = N'Công nghệ thông tin'

-- -- Ví dụ 4: Kết hợp tất cả điều kiện
-- EXEC [dbo].[sp_GetRecruitmentStatsByCompany] 
--     @minRating = 4.5,
--     @minApplications = 1,
--     @industry = N'Công nghệ thông tin'