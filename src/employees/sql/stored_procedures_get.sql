CREATE PROCEDURE [dbo].[sp_GetEmployeeEducation]
    @minAge INT = NULL,
    @gender NVARCHAR(1000) = NULL,
    @schoolName NVARCHAR(1000) = NULL
AS
BEGIN
    SELECT 
        e.id AS EmployeeId,
        e.name AS EmployeeName,
        e.email,
        e.age,
        e.gender,
        edu.school,
        edu.major,
        edu.startDate,
        edu.endDate
    FROM 
        [dbo].[Employee] e
        INNER JOIN [dbo].[Education] edu ON e.id = edu.employeeId
    WHERE 
        (@minAge IS NULL OR e.age >= @minAge)
        AND (@gender IS NULL OR e.gender = @gender)
        AND (@schoolName IS NULL OR edu.school LIKE '%' + @schoolName + '%')
    ORDER BY 
        e.name ASC,
        edu.endDate DESC;
END;

-- Cách sử dụng:
-- EXEC [dbo].[sp_GetEmployeeEducation] 
--     @minAge = 25,
--     @gender = 'Nam',
--     @schoolName = 'Harvard';

 -- Ví dụ 1: Lấy tất cả thông tin học vấn
EXEC [dbo].[sp_GetEmployeeEducation]

-- Ví dụ 2: Lọc ứng viên từ 28 tuổi trở lên
EXEC [dbo].[sp_GetEmployeeEducation] @minAge = 28

-- Ví dụ 3: Lọc ứng viên nữ từ trường Đại học Bách Khoa TP.HCM
EXEC [dbo].[sp_GetEmployeeEducation]
    @gender = N'Nữ',
    @schoolName = N'Đại học Bách Khoa TP.HCM'

-- Ví dụ 4: Kết hợp tất cả điều kiện
EXEC [dbo].[sp_GetEmployeeEducation]
    @minAge = 25,
    @gender = N'Nữ',
    @schoolName = N'Đại học Bách Khoa TP.HCM'