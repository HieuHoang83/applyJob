CREATE OR ALTER FUNCTION dbo.CalculateApplicationSuccess
(
    @employeeId INT 
)
RETURNS TABLE
AS
RETURN
(
    WITH ApplicationStats AS (
        SELECT 
            COUNT(*) as TotalApplications,
            SUM(CASE 
                WHEN rop.status IN (N'Đã nhận việc', N'Đã chấp nhận offer') 
                THEN 1 
                ELSE 0 
            END) as SuccessfulApplications
        FROM Record r
        JOIN RecordOnRecruitmentPost rop ON r.id = rop.recordId
        WHERE @employeeId IS NULL OR r.ownerId = @employeeId
    )
    SELECT 
        e.id,
        e.name,
        stats.TotalApplications,
        stats.SuccessfulApplications,
        CAST(
            CASE 
                WHEN stats.TotalApplications > 0 
                THEN CAST(stats.SuccessfulApplications AS DECIMAL(10,2)) / stats.TotalApplications * 100
                ELSE 0 
            END AS DECIMAL(10,2)
        ) as SuccessRate,
        CASE 
            WHEN (CAST(stats.SuccessfulApplications AS DECIMAL(5,2)) / 
                  NULLIF(stats.TotalApplications, 0) * 100) >= 70 THEN N'Rất tốt'
            WHEN (CAST(stats.SuccessfulApplications AS DECIMAL(5,2)) / 
                  NULLIF(stats.TotalApplications, 0) * 100) >= 50 THEN N'Tốt'
            WHEN (CAST(stats.SuccessfulApplications AS DECIMAL(5,2)) / 
                  NULLIF(stats.TotalApplications, 0) * 100) >= 30 THEN N'Trung bình'
            WHEN stats.SuccessfulApplications > 0 THEN N'Cần cải thiện'
            ELSE N'Chưa có ứng tuyển thành công'
        END as Performance
    FROM Employee e
    CROSS APPLY ApplicationStats stats
    WHERE @employeeId IS NULL OR e.id = @employeeId
);

GO
-- Cách sử dụng:
-- SELECT * FROM dbo.CalculateApplicationSuccess(NULL);

-- Xem thống kê của ứng viên viên có ID = 1
SELECT * FROM dbo.CalculateApplicationSuccess(1);

-- Xem thống kê của nhiều ứng viên viên
SELECT * FROM dbo.CalculateApplicationSuccess(1)
UNION ALL
SELECT * FROM dbo.CalculateApplicationSuccess(2)
UNION ALL
SELECT * FROM dbo.CalculateApplicationSuccess(3)
UNION ALL
SELECT * FROM dbo.CalculateApplicationSuccess(4)
UNION ALL
SELECT * FROM dbo.CalculateApplicationSuccess(5);

-- Lọc ứng viên viên có tỷ lệ thành công trên 50%
SELECT * 
FROM (
    SELECT * FROM dbo.CalculateApplicationSuccess(1)
    UNION ALL
    SELECT * FROM dbo.CalculateApplicationSuccess(2)
    UNION ALL
    SELECT * FROM dbo.CalculateApplicationSuccess(3)
    UNION ALL
    SELECT * FROM dbo.CalculateApplicationSuccess(4)
    UNION ALL
    SELECT * FROM dbo.CalculateApplicationSuccess(5)
) AS combined
WHERE SuccessRate >= 50;

