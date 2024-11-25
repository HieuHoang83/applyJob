-- Tạo trigger
CREATE TRIGGER [dbo].[TR_Employee_AuditAndSecurity]
ON [dbo].[Employee]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @action VARCHAR(10)
    DECLARE @currentTime DATETIME = GETDATE()
    DECLARE @currentUser NVARCHAR(100) = SYSTEM_USER
    DECLARE @clientIP VARCHAR(45) = CAST(CONNECTIONPROPERTY('client_net_address') AS VARCHAR(45))

    -- Xác định loại hành động
    IF EXISTS (SELECT *
        FROM INSERTED) AND EXISTS (SELECT *
        FROM DELETED)
        SET @action = 'UPDATE'
    ELSE IF EXISTS (SELECT *
    FROM INSERTED)
        SET @action = 'INSERT'
    ELSE
        SET @action = 'DELETE'

    -- Theo dõi các thay đổi cho UPDATE
    IF @action = 'UPDATE'
    BEGIN
        INSERT INTO [dbo].[EmployeeAuditLog]
            (action, employeeId, field, oldValue, newValue, modifiedBy, modifiedAt, ipAddress, suspiciousActivity, suspiciousReason)
        SELECT
            'UPDATE',
            i.id,
            CASE 
                WHEN d.email != i.email THEN 'email'
                WHEN d.name != i.name THEN 'name'
                WHEN d.password != i.password THEN 'password'
                WHEN d.phone != i.phone THEN 'phone'
                WHEN d.address != i.address THEN 'address'
                WHEN d.age != i.age THEN 'age'
                WHEN d.gender != i.gender THEN 'gender'
                WHEN d.avatar != i.avatar THEN 'avatar'
                WHEN d.isBanned != i.isBanned THEN 'isBanned'
            END,
            CASE 
                WHEN d.email != i.email THEN d.email
                WHEN d.name != i.name THEN d.name
                WHEN d.password != i.password THEN '******'
                WHEN d.phone != i.phone THEN d.phone
                WHEN d.address != i.address THEN d.address
                WHEN d.age != i.age THEN CAST(d.age AS NVARCHAR)
                WHEN d.gender != i.gender THEN d.gender
                WHEN d.avatar != i.avatar THEN d.avatar
                WHEN d.isBanned != i.isBanned THEN CAST(d.isBanned AS NVARCHAR)
            END,
            CASE 
                WHEN d.email != i.email THEN i.email
                WHEN d.name != i.name THEN i.name
                WHEN d.password != i.password THEN '******'
                WHEN d.phone != i.phone THEN i.phone
                WHEN d.address != i.address THEN i.address
                WHEN d.age != i.age THEN CAST(i.age AS NVARCHAR)
                WHEN d.gender != i.gender THEN i.gender
                WHEN d.avatar != i.avatar THEN i.avatar
                WHEN d.isBanned != i.isBanned THEN CAST(i.isBanned AS NVARCHAR)
            END,
            @currentUser,
            @currentTime,
            @clientIP,
            -- Phát hiện hoạt động đáng ngờ
            CASE 
                WHEN d.email != i.email AND
                (SELECT COUNT(*)
                FROM [dbo].[EmployeeAuditLog]
                WHERE employeeId = i.id AND field = 'email'
                    AND modifiedAt > DATEADD(day, -1, @currentTime)) >= 3 
                THEN 1
                WHEN d.password != i.password AND
                (SELECT COUNT(*)
                FROM [dbo].[EmployeeAuditLog]
                WHERE employeeId = i.id AND field = 'password'
                    AND modifiedAt > DATEADD(hour, -1, @currentTime)) >= 2
                THEN 1
                ELSE 0
            END,
            CASE 
                WHEN d.email != i.email AND
                (SELECT COUNT(*)
                FROM [dbo].[EmployeeAuditLog]
                WHERE employeeId = i.id AND field = 'email'
                    AND modifiedAt > DATEADD(day, -1, @currentTime)) >= 3 
                THEN N'Nhiều lần thay đổi email trong 24h'
                WHEN d.password != i.password AND
                (SELECT COUNT(*)
                FROM [dbo].[EmployeeAuditLog]
                WHERE employeeId = i.id AND field = 'password'
                    AND modifiedAt > DATEADD(hour, -1, @currentTime)) >= 2
                THEN N'Nhiều lần thay đổi mật khẩu trong 1h'
                ELSE NULL
            END
        FROM DELETED d
            JOIN INSERTED i ON d.id = i.id
        WHERE d.email != i.email
            OR d.name != i.name
            OR d.password != i.password
            OR d.phone != i.phone
            OR d.address != i.address
            OR d.age != i.age
            OR d.gender != i.gender
            OR d.avatar != i.avatar
            OR d.isBanned != i.isBanned;
    END

    -- Theo dõi INSERT mới
    IF @action = 'INSERT'
    BEGIN
        INSERT INTO [dbo].[EmployeeAuditLog]
            (action, employeeId, field, newValue, modifiedBy, modifiedAt, ipAddress, suspiciousActivity, suspiciousReason)
        SELECT
            'INSERT',
            id,
            'NEW_EMPLOYEE',
            CONCAT('Email: ', email, ', Name: ', name),
            @currentUser,
            @currentTime,
            @clientIP,
            -- Phát hiện đăng ký nhiều tài khoản (thêm điều kiện modifiedBy và ipAddress)
            CASE 
                WHEN (SELECT COUNT(*)
            FROM [dbo].[EmployeeAuditLog]
            WHERE email LIKE '%' + SUBSTRING(i.email, CHARINDEX('@', i.email), LEN(i.email))
                AND modifiedBy = @currentUser
                AND ipAddress = @clientIP
                AND modifiedAt > DATEADD(hour, -1, @currentTime)) >= 5
                THEN 1
                ELSE 0
            END,
            CASE 
                WHEN (SELECT COUNT(*)
            FROM [dbo].[EmployeeAuditLog]
            WHERE email LIKE '%' + SUBSTRING(i.email, CHARINDEX('@', i.email), LEN(i.email))
                AND modifiedBy = @currentUser
                AND ipAddress = @clientIP
                AND modifiedAt > DATEADD(hour, -1, @currentTime)) >= 5
                THEN N'Nhiều tài khoản được tạo từ cùng domain trong 1h bởi cùng một người dùng'
                ELSE NULL
            END
        FROM INSERTED i;
    END

    -- Theo dõi DELETE
    IF @action = 'DELETE'
    BEGIN
        INSERT INTO [dbo].[EmployeeAuditLog]
            (action, employeeId, field, oldValue, modifiedBy, modifiedAt, ipAddress, suspiciousActivity, suspiciousReason)
        SELECT
            'DELETE',
            id,
            'DELETED_EMPLOYEE',
            CONCAT('Email: ', email, ', Name: ', name),
            @currentUser,
            @currentTime,
            @clientIP,
            -- Phát hiện xóa hàng loạt
            CASE 
                WHEN (SELECT COUNT(*)
            FROM [dbo].[EmployeeAuditLog]
            WHERE action = 'DELETE'
                AND modifiedAt > DATEADD(minute, -5, @currentTime)) >= 10
                THEN 1
                ELSE 0
            END,
            CASE 
                WHEN (SELECT COUNT(*)
            FROM [dbo].[EmployeeAuditLog]
            WHERE action = 'DELETE'
                AND modifiedAt > DATEADD(minute, -5, @currentTime)) >= 10
                THEN N'Phát hiện xóa hàng loạt nhân viên trong 5 phút'
                ELSE NULL
            END
        FROM DELETED;
    END

-- Thông báo hoạt động đáng ngờ
-- IF EXISTS (SELECT 1 FROM [dbo].[EmployeeAuditLog] 
--            WHERE suspiciousActivity = 1 
--            AND modifiedAt = @currentTime)
-- BEGIN
--     DECLARE @message NVARCHAR(MAX)
--     SELECT @message = STRING_AGG(CONCAT(N'Hoạt động đáng ngờ: ', suspiciousReason, 
--                                       ' (Employee ID: ', employeeId, 
--                                       ', IP: ', ipAddress, 
--                                       ', User: ', modifiedBy, ')'), CHAR(10))
--     FROM [dbo].[EmployeeAuditLog]
--     WHERE suspiciousActivity = 1 
--     AND modifiedAt = @currentTime;

--     RAISERROR (@message, 16, 1);
-- END
END;




-- TEST TRIGGER
-- 1. Tạo nhân viên mẫu
-- Tạo nhân viên mẫu
INSERT INTO [dbo].[Employee]
    (email, name, password, phone, address, age, gender, avatar, isBanned)
VALUES
    ('test.employee@company.com', 'Test Employee', 'password123', '0123456789',
        'Test Address', 25, 'Male', 'avatar.jpg', 0);

-- 2.1 Kiểm tra thay đổi thông tin cơ bản
-- Cập nhật thông tin cơ bản
UPDATE [dbo].[Employee]
SET name = 'Updated Name',
    phone = '9876543210',
    address = 'New Address'
WHERE email = 'test.employee@company.com';

-- Kiểm tra log
SELECT *
FROM [dbo].[EmployeeAuditLog]
WHERE employeeId = (SELECT id
FROM [dbo].[Employee]
WHERE email = 'test.employee@company.com')
ORDER BY modifiedAt DESC;

-- 2.2. Kiểm tra cảnh báo thay đổi email nhiều lần
-- Thực hiện 4 lần thay đổi email trong vòng 24h
UPDATE [dbo].[Employee]
SET email = 'test1@company.com'
WHERE email = 'test.employee@company.com';

UPDATE [dbo].[Employee]
SET email = 'test2@company.com'
WHERE email = 'test1@company.com';

UPDATE [dbo].[Employee]
SET email = 'test3@company.com'
WHERE email = 'test2@company.com';

UPDATE [dbo].[Employee]
SET email = 'test4@company.com'
WHERE email = 'test3@company.com';

UPDATE [dbo].[Employee]
SET email = 'test3@company.com'
WHERE email = 'test4@company.com';


-- Kiểm tra log và cảnh báo
SELECT *
FROM [dbo].[EmployeeAuditLog]
WHERE field = 'email'
ORDER BY modifiedAt DESC;

-- 2.3. Kiểm tra cảnh báo thay đổi mật khẩu nhiều lần
-- Thực hiện 3 lần thay đổi mật khẩu trong vòng 1h
UPDATE [dbo].[Employee]
SET password = 'password1'
WHERE email = 'test4@company.com';

UPDATE [dbo].[Employee]
SET password = 'password2'
WHERE email = 'test4@company.com';

UPDATE [dbo].[Employee]
SET password = 'password3'
WHERE email = 'test4@company.com';

-- Kiểm tra log và cảnh báo
SELECT *
FROM [dbo].[EmployeeAuditLog]
WHERE field = 'password'
ORDER BY modifiedAt DESC;

-- 3. Kiểm tra INSERT hàng loạt
-- Tạo nhiều tài khoản cùng domain trong 1h
INSERT INTO [dbo].[Employee]
    (email, name, password, phone)
VALUES
    ('test1@testdomain.com', 'Test 1', 'pass1', '1111111111');
INSERT INTO [dbo].[Employee]
    (email, name, password, phone)
VALUES
    ('test2@testdomain.com', 'Test 2', 'pass2', '2222222222');
INSERT INTO [dbo].[Employee]
    (email, name, password, phone)
VALUES
    ('test3@testdomain.com', 'Test 3', 'pass3', '3333333333');
INSERT INTO [dbo].[Employee]
    (email, name, password, phone)
VALUES
    ('test4@testdomain.com', 'Test 4', 'pass4', '4444444444');
INSERT INTO [dbo].[Employee]
    (email, name, password, phone)
VALUES
    ('test5@testdomain.com', 'Test 5', 'pass5', '5555555555');
INSERT INTO [dbo].[Employee]
    (email, name, password, phone)
VALUES
    ('test6@testdomain.com', 'Test 6', 'pass6', '6666666666');
INSERT INTO [dbo].[Employee]
    (email, name, password, phone)
VALUES
    ('test7@testdomain.com', 'Test 7', 'pass7', '7777777777');
INSERT INTO [dbo].[Employee]
    (email, name, password, phone)
VALUES
    ('test8@testdomain.com', 'Test 8', 'pass8', '8888888888');
INSERT INTO [dbo].[Employee]
    (email, name, password, phone)
VALUES
    ('test9@testdomain.com', 'Test 9', 'pass9', '9999999999');
INSERT INTO [dbo].[Employee]
    (email, name, password, phone)
VALUES
    ('test10@testdomain.com', 'Test 10', 'pass10', '1010101010');
INSERT INTO [dbo].[Employee]
    (email, name, password, phone)
VALUES
    ('test11@testdomain.com', 'Test 11', 'pass11', '1111111111');
-- Kiểm tra log và cảnh báo
SELECT *
FROM [dbo].[EmployeeAuditLog]
WHERE action = 'INSERT'
    AND suspiciousActivity = 1
ORDER BY modifiedAt DESC;

-- 4. Kiểm tra DELETE hàng loạt
-- Xóa nhiều nhân viên trong 5 phút
DECLARE @i INT = 1;
WHILE @i <= 11
BEGIN
    DELETE FROM [dbo].[Employee]
    WHERE email = 'test' + CAST(@i AS VARCHAR) + '@testdomain.com';
    SET @i = @i + 1;
END

-- Kiểm tra log và cảnh báo
SELECT *
FROM [dbo].[EmployeeAuditLog]
WHERE action = 'DELETE'
    AND suspiciousActivity = 1
ORDER BY modifiedAt DESC;

-- 5. Kiểm tra tổng hợp các hoạt động đáng ngờ
-- Xem tất cả các hoạt động đáng ngờ
SELECT
    action,
    employeeId,
    field,
    oldValue,
    newValue,
    suspiciousReason,
    modifiedBy,
    modifiedAt,
    ipAddress
FROM [dbo].[EmployeeAuditLog]
WHERE suspiciousActivity = 1
ORDER BY modifiedAt DESC;

--
