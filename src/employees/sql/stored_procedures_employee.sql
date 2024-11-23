-- Helper function to validate email format
CREATE FUNCTION dbo.IsValidEmail(@Email NVARCHAR(1000))
RETURNS BIT
AS
BEGIN
    RETURN CASE WHEN @Email LIKE '%_@__%.__%' THEN 1 ELSE 0 END
END
GO

-- Helper function to validate phone number (Vietnam format)
CREATE FUNCTION dbo.IsValidPhone(@Phone NVARCHAR(1000))
RETURNS BIT
AS
BEGIN
    RETURN CASE WHEN @Phone LIKE '0[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' THEN 1 ELSE 0 END
END
GO

-- Create Employee Procedure
CREATE PROCEDURE dbo.sp_CreateEmployee
    @phone NVARCHAR(1000),
    @address NVARCHAR(1000),
    @email NVARCHAR(1000),
    @name NVARCHAR(1000),
    @gender NVARCHAR(1000),
    @age INT,
    @avatar NVARCHAR(1000),
    @password NVARCHAR(1000)
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Validate required fields
    IF @email IS NULL OR @name IS NULL OR @password IS NULL
        THROW 50001, 'Email, Tên và password là các trường bắt buộc', 1;
    
    -- Validate email format
    IF dbo.IsValidEmail(@email) = 0
        THROW 50002, 'Địa chỉ email không hợp lệ', 1;
    
    -- Validate phone format (if provided)
    IF @phone IS NOT NULL AND dbo.IsValidPhone(@phone) = 0
        THROW 50003, 'Số điện thoại không hợp lệ. Phải là 10 chữ số và bắt đầu bằng 0', 1;
    
    -- Validate age
    IF @age IS NOT NULL AND @age < 16
        THROW 50004, 'Ứng viên phải trên 16 tuổi', 1;
    
    -- Validate gender
    IF @gender IS NOT NULL AND @gender NOT IN ('Nam', 'Nữ', 'Khác')
        THROW 50005, 'Giới tính phải là Nam, Nữ, hoặc Khác', 1;

    -- Check if email already exists
    IF EXISTS (SELECT 1 FROM dbo.Employee WHERE email = @email)
        THROW 50006, 'Email đã tồn tại', 1;

    INSERT INTO dbo.Employee (
        phone, address, email, name, gender, age, 
        avatar, password, provider, emailVerified, isBanned
    )
    VALUES (
        @phone, @address, @email, @name, @gender, @age,
        @avatar, @password, 'credentials', 0, 0
    );

    SELECT SCOPE_IDENTITY() as EmployeeId;
END
GO

-- Update Employee Procedure
CREATE PROCEDURE dbo.sp_UpdateEmployee
    @id INT,
    @phone NVARCHAR(1000) = NULL,
    @address NVARCHAR(1000) = NULL,
    @email NVARCHAR(1000) = NULL,
    @name NVARCHAR(1000) = NULL,
    @gender NVARCHAR(1000) = NULL,
    @age INT = NULL,
    @avatar NVARCHAR(1000) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if employee exists
    IF NOT EXISTS (SELECT 1 FROM dbo.Employee WHERE id = @id)
        THROW 50007, 'Không tìm thấy ứng viên', 1;

    -- Validate email format if provided
    IF @email IS NOT NULL
    BEGIN
        IF dbo.IsValidEmail(@email) = 0
            THROW 50002, 'Địa chỉ email không hợp lệ', 1;
            
        -- Check if new email already exists for different employee
        IF EXISTS (SELECT 1 FROM dbo.Employee WHERE email = @email AND id != @id)
            THROW 50006, 'Email đã tồn tại', 1;
    END

    -- Validate phone format if provided
    IF @phone IS NOT NULL AND dbo.IsValidPhone(@phone) = 0
        THROW 50003, 'Số điện thoại không hợp lệ. Phải là 10 chữ số và bắt đầu bằng 0', 1;

    -- Validate age if provided
    IF @age IS NOT NULL AND @age < 16
        THROW 50004, 'Ứng viên phải trên 16 tuổi', 1;

    -- Validate gender if provided
    IF @gender IS NOT NULL AND @gender NOT IN ('Nam', 'Nữ', 'Khác')
        THROW 50005, 'Giới tính phải là Nam, Nữ, hoặc Khác', 1;

    UPDATE dbo.Employee
    SET
        phone = ISNULL(@phone, phone),
        address = ISNULL(@address, address),
        email = ISNULL(@email, email),
        name = ISNULL(@name, name),
        gender = ISNULL(@gender, gender),
        age = ISNULL(@age, age),
        avatar = ISNULL(@avatar, avatar),
        updatedAt = GETDATE()
    WHERE id = @id;
END
GO

-- Delete Employee Procedure
CREATE PROCEDURE dbo.sp_DeleteEmployee
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if employee exists
    IF NOT EXISTS (SELECT 1 FROM dbo.Employee WHERE id = @id)
        THROW 50007, 'Không tìm thấy ứng viên', 1;

    -- Check for related records
    IF EXISTS (SELECT 1 FROM dbo.Education WHERE employeeId = @id)
        THROW 50008, 'Không thể xóa ứng viên có bằng cấp tồn tại', 1;

    IF EXISTS (SELECT 1 FROM dbo.Experience WHERE employeeId = @id)
        THROW 50009, 'Không thể xóa ứng viên có kinh nghiệm tồn tại', 1;

    IF EXISTS (SELECT 1 FROM dbo.Certificate WHERE employeeId = @id)
        THROW 50010, 'Không thể xóa ứng viên có chứng chỉ tồn tại', 1;

    IF EXISTS (SELECT 1 FROM dbo.Record WHERE ownerId = @id)
        THROW 50011, 'Không thể xóa ứng viên có lịch sử tồn tại', 1;

    DELETE FROM dbo.Employee WHERE id = @id;
END
GO

-- Ví dụ thực thi CREATE Employee
EXEC dbo.sp_CreateEmployee
    @phone = '0912345678',
    @address = N'123 Đường ABC, Quận 1, TP.HCM',
    @email = 'nhanvien@example.com',
    @name = N'Nguyễn Văn A',
    @gender = N'Nam',
    @age = 25,
    @avatar = 'https://example.com/avatar.jpg',
    @password = 'hashedPassword123';

-- Ví dụ thực thi UPDATE Employee
EXEC dbo.sp_UpdateEmployee
    @id = 6,
    @phone = '0987654321',
    @address = N'456 Đường XYZ, Quận 2, TP.HCM',
    @email = 'nhanvien.moi@example.com',
    @name = N'Nguyễn Văn A Updated',
    @gender = N'Nam',
    @age = 26,
    @avatar = 'https://example.com/new-avatar.jpg';

-- Ví dụ thực thi DELETE Employee
EXEC dbo.sp_DeleteEmployee @id = 6;