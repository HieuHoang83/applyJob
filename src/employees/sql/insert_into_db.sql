-- Thêm Companies
INSERT INTO [dbo].[Company] ([name], [description], [url], [industry], [size], [address], [logo], [cover])
VALUES 
(N'FPT Software', N'Công ty phần mềm hàng đầu Việt Nam với hơn 20 năm kinh nghiệm', 'https://fpt-software.com', N'Công nghệ thông tin', N'> 10000 nhân viên', N'FPT Complex, Đà Nẵng', 'https://logo.fpt.com', 'https://cover.fpt.com'),
(N'Viettel', N'Tập đoàn viễn thông quân đội hàng đầu Việt Nam', 'https://viettel.com.vn', N'Viễn thông', N'> 50000 nhân viên', N'Hà Nội', 'https://logo.viettel.com', 'https://cover.viettel.com'),
(N'VNG Corporation', N'Công ty công nghệ hàng đầu Việt Nam', 'https://vng.com.vn', N'Công nghệ thông tin', N'5000-10000 nhân viên', N'TP.HCM', 'https://logo.vng.com', 'https://cover.vng.com'),
(N'Momo', N'Ví điện tử hàng đầu Việt Nam', 'https://momo.vn', N'Fintech', N'1000-5000 nhân viên', N'TP.HCM', 'https://logo.momo.vn', 'https://cover.momo.vn'),
(N'Tiki', N'Sàn thương mại điện tử hàng đầu Việt Nam', 'https://tiki.vn', N'E-commerce', N'1000-5000 nhân viên', N'TP.HCM', 'https://logo.tiki.vn', 'https://cover.tiki.vn');

-- Thêm Domain
INSERT INTO [dbo].[Domain] ([name], [description])
VALUES 
(N'Web Development', N'Phát triển ứng dụng web'),
(N'Mobile Development', N'Phát triển ứng dụng di động'),
(N'Cloud Computing', N'Điện toán đám mây'),
(N'Artificial Intelligence', N'Trí tuệ nhân tạo'),
(N'Blockchain', N'Công nghệ Blockchain');

-- Thêm DomainOnCompany
INSERT INTO [dbo].[DomainOnCompany] ([domainId], [companyId])
VALUES 
(1, 1), (2, 1), (3, 1),
(1, 2), (3, 2), (4, 2),
(2, 3), (4, 3), (5, 3),
(1, 4), (2, 4), (5, 4),
(1, 5), (2, 5), (3, 5);

-- Thêm Position
INSERT INTO [dbo].[Position] ([name])
VALUES 
(N'Software Engineer'),
(N'Product Manager'),
(N'Business Analyst'),
(N'UI/UX Designer'),
(N'Data Scientist'),
(N'DevOps Engineer');

-- Thêm superAdmin
INSERT INTO [dbo].[Admin] ([email], [name], [gender], [birthday ], [password], [avatar])
VALUES 
('adminsuper@system.com', N'Lê Văn Hùng', N'Nam', DATEADD(YEAR, -40, GETDATE()), 'hashed_password_1', 'https://avatar1.com');

-- Thêm Admin
INSERT INTO [dbo].[Admin] ([email], [name], [gender], [birthday ], [password], [avatar], [verificationCode],[superAdminId])
VALUES 
('admin1@system.com', N'Nguyễn Trí Đức', N'Nam', DATEADD(YEAR, -30, GETDATE()), 'hashed_password_2', 'https://avatar2.com', 475867595, 1),
('admin2@system.com', N'Trần Thị Hà', N'Nữ', DATEADD(YEAR, -28, GETDATE()), 'hashed_password_3', 'https://avatar3.com', 574839712, 1),
('admin3@system.com', N'Phạm Ngọc Minh', N'Nữ', DATEADD(YEAR, -32, GETDATE()), 'hashed_password_4', 'https://avatar4.com', 798357471, 1),
('admin4@system.com', N'Hoàng Văn Hải', N'Nam', DATEADD(YEAR, -29, GETDATE()), 'hashed_password_5', 'https://avatar5.com', 470158473, 1);

-- Thêm Employee
INSERT INTO [dbo].[Employee] ([email], [name], [gender], [birthday], [phone], [address], [password], [avatar])
VALUES 
('nguyendung@gmail.com', N'Nguyễn Dũng', N'Nam', DATEADD(YEAR, -25, GETDATE()), '0987654321', N'Đà Nẵng', 'hashed_password_1', 'https://avatar1.com'),
('lehuyen@gmail.com', N'Lê Thanh Huyền', N'Nữ', DATEADD(YEAR, -28, GETDATE()), '0987654322', N'Hà Nội', 'hashed_password_2', 'https://avatar2.com'),
('doanhung@gmail.com', N'Đoàn Trí Hùng', N'Nam', DATEADD(YEAR, -27, GETDATE()), '0987654323', N'TP.HCM', 'hashed_password_3', 'https://avatar3.com'),
('phamha@gmail.com', N'Phạm Thị Hà', N'Nữ', DATEADD(YEAR, -26, GETDATE()), '0987654324', N'Đà Nẵng', 'hashed_password_4', 'https://avatar4.com'),
('tranminh@gmail.com', N'Trần Cao Minh', N'Nam', DATEADD(YEAR, -29, GETDATE()), '0987654325', N'Hà Nội', 'hashed_password_5', 'https://avatar5.com');

-- Thêm Education
INSERT INTO [dbo].[Education] ([school], [major], [description], [startDate], [endDate], [employeeId])
VALUES 
(N'Đại học Bách Khoa Hà Nội', N'Khoa học máy tính', N'Chuyên ngành phát triển phần mềm', '2015-09-01', '2019-06-30', 1),
(N'Đại học FPT', N'Kỹ thuật phần mềm', N'Chuyên ngành AI', '2016-09-01', '2020-06-30', 2),
(N'Đại học Công nghệ - ĐHQGHN', N'An toàn thông tin', N'Chuyên ngành bảo mật', '2015-09-01', '2019-06-30', 3),
(N'Đại học Bách Khoa TP.HCM', N'Hệ thống thông tin', N'Chuyên ngành phân tích dữ liệu', '2016-09-01', '2020-06-30', 4),
(N'Đại học Đà Nẵng', N'Công nghệ thông tin', N'Chuyên ngành phát triển web', '2015-09-01', '2019-06-30', 5);

-- Thêm Experience
INSERT INTO [dbo].[Experience] ([employeeId], [company], [position], [description], [url], [image], [startDate], [endDate])
VALUES 
(1, N'FPT Software', N'Junior Developer', N'Phát triển ứng dụng web using React', 'https://fpt-software.com', 'https://logo.fpt.com', '2019-07-01', '2021-06-30'),
(2, N'Viettel', N'Mobile Developer', N'Phát triển ứng dụng di động using Flutter', 'https://viettel.com.vn', 'https://logo.viettel.com', '2020-07-01', '2022-06-30'),
(3, N'VNG', N'Backend Developer', N'Phát triển API using NodeJS', 'https://vng.com.vn', 'https://logo.vng.com', '2019-07-01', '2021-06-30'),
(4, N'Momo', N'Frontend Developer', N'Phát triển giao diện using Vue.js', 'https://momo.vn', 'https://logo.momo.vn', '2020-07-01', '2022-06-30'),
(5, N'Tiki', N'Fullstack Developer', N'Phát triển ứng dụng using MERN stack', 'https://tiki.vn', 'https://logo.tiki.vn', '2019-07-01', '2021-06-30');

-- Thêm Certificate
INSERT INTO [dbo].[Certificate] ([name], [organization], [url], [image], [verifiedDate], [employeeId])
VALUES 
('AWS Solutions Architect', 'Amazon', 'https://cert1.aws.com', 'https://img1.aws.com', '2022-01-15', 1),
('Google Cloud Engineer', 'Google', 'https://cert1.google.com', 'https://img1.google.com', '2022-02-20', 2),
('Azure Developer', 'Microsoft', 'https://cert1.azure.com', 'https://img1.azure.com', '2022-03-25', 3),
('CCNA', 'Cisco', 'https://cert1.cisco.com', 'https://img1.cisco.com', '2022-04-10', 4),
('Oracle Java Certificate', 'Oracle', 'https://cert1.oracle.com', 'https://img1.oracle.com', '2022-05-05', 5);

-- Thêm Employer
INSERT INTO [dbo].[Employer] ([email], [name], [gender], [birthday], [password], [department], [position], [companyId], [avatar], [hiringDate])
VALUES 
('hr1@fpt.com', N'HR FPT', N'Nữ', DATEADD(YEAR, -30, GETDATE()), 'hashed_password_1', N'Nhân sự', N'HR Manager', 1, 'https://avatar1.com', GETDATE()),
('hr1@viettel.com', N'HR Viettel', N'Nam', DATEADD(YEAR, -35, GETDATE()), 'hashed_password_2', N'Nhân sự', N'HR Director', 2, 'https://avatar2.com', GETDATE()),
('hr1@vng.com', N'HR VNG', N'Nữ', DATEADD(YEAR, -32, GETDATE()), 'hashed_password_3', N'Nhân sự', N'HR Manager', 3, 'https://avatar3.com', GETDATE()),
('hr1@momo.com', N'HR Momo', N'Nam', DATEADD(YEAR, -28, GETDATE()), 'hashed_password_4', N'Nhân sự', N'HR Specialist', 4, 'https://avatar4.com', GETDATE()),
('hr1@tiki.com', N'HR Tiki', N'Nữ', DATEADD(YEAR, -33, GETDATE()), 'hashed_password_5', N'Nhân sự', N'HR Manager', 5, 'https://avatar5.com', GETDATE());

-- Thêm RecruitmentPost
INSERT INTO [dbo].[RecruitmentPost] ([title], [description], [employerId], [datePosted], [deadline])
VALUES 
(N'Senior Java Developer', N'Tuyển Senior Java Developer cho dự án ngân hàng', 1, GETDATE(), '2024-12-31'),
(N'React Native Developer', N'Tuyển React Native Developer cho dự án fintech', 2, GETDATE(), '2024-12-31'),
(N'DevOps Engineer', N'Tuyển DevOps Engineer cho dự án cloud', 3, GETDATE(), '2024-12-31'),
(N'Frontend Developer', N'Tuyển Frontend Developer cho dự án e-commerce', 4, GETDATE(), '2024-12-31'),
(N'Fullstack Developer', N'Tuyển Fullstack Developer cho dự án startup', 5, GETDATE(), '2024-12-31');

-- Thêm JobDescription
INSERT INTO [dbo].[JobDescription] ([location], [level], [experience], [salary], [quantity], [employmentType], [gender], [recruitmentPostId])
VALUES 
(N'Đà Nẵng', N'Senior', N'5 năm', N'2000-3000 USD', 2, N'Full-time', N'Not required', 1),
(N'Hà Nội', N'Middle', N'3 năm', N'1500-2500 USD', 3, N'Full-time', N'Not required', 2),
(N'TP.HCM', N'Senior', N'4 năm', N'2500-3500 USD', 1, N'Full-time', N'Not required', 3),
(N'Đà Nẵng', N'Middle', N'2 năm', N'1000-2000 USD', 4, N'Full-time', N'Not required', 4),
(N'Hà Nội', N'Senior', N'5 năm', N'2000-3000 USD', 2, N'Full-time', N'Not required', 5);

-- Thêm File (CV)
INSERT INTO [dbo].[File] ([name], [mimeType], [size], [url])
VALUES 
(N'CV_NguyenDung.pdf', 'application/pdf', 1024, 'https://storage.com/cv1.pdf'),
(N'CV_LeThanhHuyen.pdf', 'application/pdf', 2048, 'https://storage.com/cv2.pdf'),
(N'CV_DoanTriHung.pdf', 'application/pdf', 3072, 'https://storage.com/cv3.pdf'),
(N'CV_PhamThiHa.pdf', 'application/pdf', 4096, 'https://storage.com/cv4.pdf'),
(N'CV_TranCaoMinh.pdf', 'application/pdf', 1024, 'https://storage.com/cv5.pdf');

-- Thêm Record
INSERT INTO [dbo].[Record] ([title], [description], [ownerId], [fileCvId])
VALUES 
(N'Hồ sơ Java Developer', N'Hồ sơ ứng tuyển vị trí Java Developer', 1, 1),
(N'Hồ sơ Mobile Developer', N'Hồ sơ ứng tuyển vị trí Mobile Developer', 2, 2),
(N'Hồ sơ DevOps', N'Hồ sơ ứng tuyển vị trí DevOps Engineer', 3, 3),
(N'Hồ sơ Frontend Developer', N'Hồ sơ ứng tuyển vị trí Frontend Developer', 4, 4),
(N'Hồ sơ Fullstack Developer', N'Hồ sơ ứng tuyển vị trí Fullstack Developer', 5, 5);

-- Thêm RecordOnRecruitmentPost
INSERT INTO [dbo].[RecordOnRecruitmentPost] ([recordId], [recruitmentPostId], [job], [status])
VALUES 
(1, 1, N'Senior Java Developer', N'Đã chấp nhận'),
(2, 2, N'React Native Developer', N'Đang chờ xét duyệt'),
(3, 3, N'DevOps Engineer', N'Đã từ chối'),
(4, 4, N'Frontend Developer', N'Đã chấp nhận'),
(5, 5, N'Fullstack Developer', N'Đang chờ xét duyệt');

-- Thêm Evaluation
INSERT INTO [dbo].[Evaluation] ([recruitmentPostId], [employeeId], [rating], [saved])
VALUES 
(1, 1, 4.5, 1),
(2, 2, 4.8, 1),
(3, 3, 4.2, 0),
(4, 4, 4.6, 1),
(5, 5, 4.7, 0);

-- Thêm RecruitmentPostPosition (Liên kết giữa bài đăng tuyển dụng và vị trí công việc)
INSERT INTO [dbo].[RecruitmentPostPosition] ([recruitmentPostId], [positionId])
VALUES 
-- Senior Java Developer post có thể yêu cầu Software Engineer và DevOps Engineer
(1, 1), -- Software Engineer
(1, 6), -- DevOps Engineer

-- React Native Developer post cần Software Engineer
(2, 1), -- Software Engineer

-- DevOps Engineer post cần DevOps Engineer và Software Engineer
(3, 6), -- DevOps Engineer
(3, 1), -- Software Engineer

-- Frontend Developer post cần Software Engineer và UI/UX Designer
(4, 1), -- Software Engineer
(4, 4), -- UI/UX Designer

-- Fullstack Developer post cần nhiều vị trí
(5, 1), -- Software Engineer
(5, 6), -- DevOps Engineer
(5, 4); -- UI/UX Designer

-- Thêm ExperienceOnRecord (Liên kết giữa kinh nghiệm và hồ sơ)
INSERT INTO [dbo].[ExperienceOnRecord] ([experienceId], [recordId])
VALUES 
(1, 1), -- Kinh nghiệm FPT cho hồ sơ Java Developer
(2, 2), -- Kinh nghiệm Viettel cho hồ sơ Mobile Developer
(3, 3), -- Kinh nghiệm VNG cho hồ sơ DevOps
(4, 4), -- Kinh nghiệm Momo cho hồ sơ Frontend Developer
(5, 5); -- Kinh nghiệm Tiki cho hồ sơ Fullstack Developer

-- Thêm EducationOnRecord (Liên kết giữa học vấn và hồ sơ)
INSERT INTO [dbo].[EducationOnRecord] ([educationId], [recordId])
VALUES 
(1, 1), -- Học vấn Bách Khoa HN cho hồ sơ Java Developer
(2, 2), -- Học vấn FPT cho hồ sơ Mobile Developer
(3, 3), -- Học vấn ĐHCN-ĐHQGHN cho hồ sơ DevOps
(4, 4), -- Học vấn Bách Khoa TP.HCM cho hồ sơ Frontend Developer
(5, 5); -- Học vấn ĐH Đà Nẵng cho hồ sơ Fullstack Developer

-- Thêm CertificateOnRecord (Liên kết giữa chứng chỉ và hồ sơ)
INSERT INTO [dbo].[CertificateOnRecord] ([certificateId], [recordId])
VALUES 
(1, 1), -- Chứng chỉ AWS cho hồ sơ Java Developer
(2, 2), -- Chứng chỉ Google Cloud cho hồ sơ Mobile Developer
(3, 3), -- Chứng chỉ Azure cho hồ sơ DevOps
(4, 4), -- Chứng chỉ CCNA cho hồ sơ Frontend Developer
(5, 5); -- Chứng chỉ Oracle cho hồ sơ Fullstack Developer