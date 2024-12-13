CREATE OR ALTER PROCEDURE [dbo].[sp_FilterRecordsByRequirements]
    @postId INT,
    @certificateName NVARCHAR(1000) = NULL,
    @schoolName NVARCHAR(1000) = NULL,
    @companyName NVARCHAR(1000) = NULL
AS
BEGIN
    SELECT DISTINCT
        r.id AS RecordId,
        r.title AS RecordTitle,
        e.id AS EmployeeId,
        e.name AS EmployeeName,
        e.email AS EmployeeEmail,
        rop.status AS ApplicationStatus,
        rop.createdAt AS AppliedDate,
        -- Certificate info
        STRING_AGG(CONVERT(NVARCHAR(MAX), c.name), ', ') AS Certificates,
        -- Education info
        STRING_AGG(CONVERT(NVARCHAR(MAX), edu.school), ', ') AS Schools,
        -- Experience info
        STRING_AGG(CONVERT(NVARCHAR(MAX), exp.company), ', ') AS Companies
    FROM 
        [dbo].[Record] r
        INNER JOIN [dbo].[RecordOnRecruitmentPost] rop ON r.id = rop.recordId
        INNER JOIN [dbo].[Employee] e ON r.ownerId = e.id
        LEFT JOIN [dbo].[CertificateOnRecord] cor ON r.id = cor.recordId
        LEFT JOIN [dbo].[Certificate] c ON cor.certificateId = c.id
        LEFT JOIN [dbo].[EducationOnRecord] eor ON r.id = eor.recordId
        LEFT JOIN [dbo].[Education] edu ON eor.educationId = edu.id
        LEFT JOIN [dbo].[ExperienceOnRecord] exr ON r.id = exr.recordId
        LEFT JOIN [dbo].[Experience] exp ON exr.experienceId = exp.id
    WHERE 
        rop.recruitmentPostId = @postId
        AND (@certificateName IS NULL OR EXISTS (
            SELECT 1 
            FROM [dbo].[CertificateOnRecord] cor2
            JOIN [dbo].[Certificate] c2 ON cor2.certificateId = c2.id
            WHERE cor2.recordId = r.id 
            AND c2.name LIKE '%' + @certificateName + '%'
        ))
        AND (@schoolName IS NULL OR EXISTS (
            SELECT 1 
            FROM [dbo].[EducationOnRecord] eor2
            JOIN [dbo].[Education] edu2 ON eor2.educationId = edu2.id
            WHERE eor2.recordId = r.id 
            AND edu2.school LIKE '%' + @schoolName + '%'
        ))
        AND (@companyName IS NULL OR EXISTS (
            SELECT 1 
            FROM [dbo].[ExperienceOnRecord] exr2
            JOIN [dbo].[Experience] exp2 ON exr2.experienceId = exp2.id
            WHERE exr2.recordId = r.id 
            AND exp2.company LIKE '%' + @companyName + '%'
        ))
    GROUP BY 
        r.id,
        r.title,
        e.id,
        e.name,
        e.email,
        rop.status,
        rop.createdAt
    ORDER BY 
        rop.createdAt DESC;
END;

-- -- Cách sử dụng:
-- -- Ví dụ 1: Lấy tất cả record của một bài đăng
-- EXEC [dbo].[sp_FilterRecordsByRequirements] 
--     @postId = 1

-- -- Ví dụ 2: Lọc theo chứng chỉ
-- EXEC [dbo].[sp_FilterRecordsByRequirements] 
--     @postId = 1,
--     @certificateName = 'AWS'

-- -- Ví dụ 3: Lọc theo trường học
-- EXEC [dbo].[sp_FilterRecordsByRequirements] 
--     @postId = 1,
--     @schoolName = N'Bách Khoa'

-- -- Ví dụ 4: Lọc theo công ty đã làm
-- EXEC [dbo].[sp_FilterRecordsByRequirements] 
--     @postId = 1,
--     @companyName = 'FPT'

-- -- Ví dụ 5: Kết hợp tất cả điều kiện
-- EXEC [dbo].[sp_FilterRecordsByRequirements] 
--     @postId = 1,
--     @certificateName = 'AWS',
--     @schoolName = N'Bách Khoa',
--     @companyName = 'FPT'