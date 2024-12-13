CREATE OR ALTER FUNCTION dbo.CalculateApplicationSuccess
(
    @employeeId INT 
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        e.id AS EmployeeId,
        e.name AS EmployeeName,
        r.id AS RecordId,
        r.title AS RecordTitle,
        -- Số lần đã được xử lý của record này
        SUM(CASE 
            WHEN rop.status IN (N'Đã chấp nhận', N'Đã từ chối') 
            THEN 1 
            ELSE 0 
        END) as ProcessedApplications,
        -- Số lần được chấp nhận của record này
        SUM(CASE 
            WHEN rop.status = N'Đã chấp nhận'
            THEN 1 
            ELSE 0 
        END) as SuccessfulApplications,
        -- Tỉ lệ thành công của record này
        CAST(
            CASE 
                WHEN SUM(CASE 
                    WHEN rop.status IN (N'Đã chấp nhận', N'Đã từ chối') 
                    THEN 1 
                    ELSE 0 
                END) > 0 
                THEN CAST(SUM(CASE 
                    WHEN rop.status = N'Đã chấp nhận'
                    THEN 1 
                    ELSE 0 
                END) AS DECIMAL(10,2)) / 
                SUM(CASE 
                    WHEN rop.status IN (N'Đã chấp nhận', N'Đã từ chối') 
                    THEN 1 
                    ELSE 0 
                END) * 100
                ELSE 0 
            END AS DECIMAL(10,2)
        ) as SuccessRate,
        -- Đánh giá hiệu suất của record này
        CASE 
            WHEN SUM(CASE 
                WHEN rop.status IN (N'Đã chấp nhận', N'Đã từ chối') 
                THEN 1 
                ELSE 0 
            END) = 0 THEN N'Chưa có kết quả xử lý'
            WHEN (CAST(SUM(CASE 
                WHEN rop.status = N'Đã chấp nhận'
                THEN 1 
                ELSE 0 
            END) AS DECIMAL(5,2)) / 
            SUM(CASE 
                WHEN rop.status IN (N'Đã chấp nhận', N'Đã từ chối') 
                THEN 1 
                ELSE 0 
            END) * 100) >= 70 THEN N'Rất tốt'
            WHEN (CAST(SUM(CASE 
                WHEN rop.status = N'Đã chấp nhận'
                THEN 1 
                ELSE 0 
            END) AS DECIMAL(5,2)) / 
            SUM(CASE 
                WHEN rop.status IN (N'Đã chấp nhận', N'Đã từ chối') 
                THEN 1 
                ELSE 0 
            END) * 100) >= 50 THEN N'Tốt'
            WHEN (CAST(SUM(CASE 
                WHEN rop.status = N'Đã chấp nhận'
                THEN 1 
                ELSE 0 
            END) AS DECIMAL(5,2)) / 
            SUM(CASE 
                WHEN rop.status IN (N'Đã chấp nhận', N'Đã từ chối') 
                THEN 1 
                ELSE 0 
            END) * 100) >= 30 THEN N'Trung bình'
            WHEN SUM(CASE 
                WHEN rop.status = N'Đã chấp nhận'
                THEN 1 
                ELSE 0 
            END) > 0 THEN N'Cần cải thiện'
            ELSE N'Chưa có ứng tuyển thành công'
        END as Performance
    FROM Employee e
    JOIN Record r ON e.id = r.ownerId
    JOIN RecordOnRecruitmentPost rop ON r.id = rop.recordId
    WHERE @employeeId IS NULL OR e.id = @employeeId
    GROUP BY 
        e.id,
        e.name,
        r.id,
        r.title
);

GO

-- INSERT INTO [dbo].[Record] ([title], [description], [ownerId], [fileCvId])
-- VALUES 
-- (N'Hồ sơ DevOps Engineer', N'Hồ sơ ứng tuyển vị trí DevOps Engineer', 1, 1);
-- INSERT INTO [dbo].[RecordOnRecruitmentPost] ([recordId], [recruitmentPostId], [job], [status])
-- VALUES 
-- (6, 2, N'React DevOps Engineer', N'Đã chấp nhận');
-- -- Xem thống kê của ứng viên viên có ID = 1
-- SELECT * FROM dbo.CalculateApplicationSuccess(1);

-- -- Xem thống kê của nhiều ứng viên viên
-- SELECT * FROM dbo.CalculateApplicationSuccess(1)
-- UNION ALL
-- SELECT * FROM dbo.CalculateApplicationSuccess(2)
-- UNION ALL
-- SELECT * FROM dbo.CalculateApplicationSuccess(3)
-- UNION ALL
-- SELECT * FROM dbo.CalculateApplicationSuccess(4)
-- UNION ALL
-- SELECT * FROM dbo.CalculateApplicationSuccess(5);

-- -- Lọc ứng viên viên có tỷ lệ thành công trên 50%
-- SELECT * 
-- FROM (
--     SELECT * FROM dbo.CalculateApplicationSuccess(1)
--     UNION ALL
--     SELECT * FROM dbo.CalculateApplicationSuccess(2)
--     UNION ALL
--     SELECT * FROM dbo.CalculateApplicationSuccess(3)
--     UNION ALL
--     SELECT * FROM dbo.CalculateApplicationSuccess(4)
--     UNION ALL
--     SELECT * FROM dbo.CalculateApplicationSuccess(5)
-- ) AS combined
-- WHERE SuccessRate >= 50;

