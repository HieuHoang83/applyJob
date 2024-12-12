-- Thêm Companies
INSERT INTO [dbo].[Company]
     ([name], [description], [url], [industry], [size], [address], [logo], [cover])
VALUES
     (N'FPT Software', N'Công ty phần mềm hàng đầu Việt Nam với hơn 20 năm kinh nghiệm', 'https://fpt-software.com', N'Công nghệ thông tin', N'> 10000 nhân viên', N'FPT Complex, Đà Nẵng', 'https://logo.fpt.com', 'https://cover.fpt.com'),
     (N'Viettel', N'Tập đoàn viễn thông quân đội hàng đầu Việt Nam', 'https://viettel.com.vn', N'Viễn thông', N'> 50000 nhân viên', N'Hà Nội', 'https://logo.viettel.com', 'https://cover.viettel.com'),
     (N'VNG Corporation', N'Công ty công nghệ hàng đầu Việt Nam', 'https://vng.com.vn', N'Công nghệ thông tin', N'5000-10000 nhân viên', N'TP.HCM', 'https://logo.vng.com', 'https://cover.vng.com'),
     (N'Momo', N'Ví điện tử hàng đầu Việt Nam', 'https://momo.vn', N'Fintech', N'1000-5000 nhân viên', N'TP.HCM', 'https://logo.momo.vn', 'https://cover.momo.vn'),
     (N'Tiki', N'Sàn thương mại điện tử hàng đầu Việt Nam', 'https://tiki.vn', N'E-commerce', N'1000-5000 nhân viên', N'TP.HCM', 'https://logo.tiki.vn', 'https://cover.tiki.vn'),
     (N'Shopee', N'Sàn thương mại điện tử hàng đầu Đông Nam Á', 'https://shopee.vn', N'E-commerce', N'> 5000 nhân viên', N'TP.HCM', 'https://logo.shopee.vn', 'https://cover.shopee.vn'),
     (N'Sendo', N'Sàn thương mại điện tử Việt Nam', 'https://sendo.vn', N'E-commerce', N'1000-5000 nhân viên', N'TP.HCM', 'https://logo.sendo.vn', 'https://cover.sendo.vn'),
     (N'Grab Vietnam', N'Công ty công nghệ đa nền tảng', 'https://grab.com', N'Technology', N'> 3000 nhân viên', N'TP.HCM', 'https://logo.grab.com', 'https://cover.grab.com'),
     (N'VNPAY', N'Công ty Fintech hàng đầu Việt Nam', 'https://vnpay.vn', N'Fintech', N'1000-5000 nhân viên', N'Hà Nội', 'https://logo.vnpay.vn', 'https://cover.vnpay.vn'),
     (N'Naver Vietnam', N'Công ty công nghệ Hàn Quốc tại Việt Nam', 'https://navercorp.com', N'Công nghệ thông tin', N'1000-5000 nhân viên', N'Hà Nội', 'https://logo.naver.vn', 'https://cover.naver.vn');

-- Thêm Domain
INSERT INTO [dbo].[Domain]
     ([name], [description])
VALUES
     (N'Web Development', N'Phát triển ứng dụng web'),
     (N'Mobile Development', N'Phát triển ứng dụng di động'),
     (N'Cloud Computing', N'Điện toán đám mây'),
     (N'Artificial Intelligence', N'Trí tuệ nhân tạo'),
     (N'Blockchain', N'Công nghệ Blockchain'),
     (N'Data Science', N'Khoa học dữ liệu và phân tích'),
     (N'DevOps', N'Vận hành và phát triển hệ thống'),
     (N'Security', N'Bảo mật thông tin'),
     (N'UI/UX Design', N'Thiết kế trải nghiệm người dùng'),
     (N'Product Management', N'Quản lý sản phẩm');

-- Thêm DomainOnCompany
INSERT INTO [dbo].[DomainOnCompany]
     ([domainId], [companyId])
VALUES
     (1, 1),
     (2, 1),
     (3, 1),
     (1, 2),
     (3, 2),
     (4, 2),
     (2, 3),
     (4, 3),
     (5, 3),
     (1, 4),
     (2, 4),
     (5, 4),
     (1, 5),
     (2, 5),
     (3, 5),
     -- Shopee có nhiều domain
     (1, 6),
     (2, 6),
     (3, 6),
     (4, 6),
     -- Sendo có nhiều domain
     (1, 7),
     (4, 7),
     (5, 7),
     -- Grab có nhiều domain
     (2, 8),
     (3, 8),
     (5, 8),
     -- VNPAY có nhiều domain
     (1, 9),
     (3, 9),
     (5, 9),
     -- Naver có nhiều domain
     (2, 10),
     (4, 10),
     (5, 10);

-- Thêm Position
INSERT INTO [dbo].[Position]
     ([name])
VALUES
     (N'Software Engineer'),
     (N'Product Manager'),
     (N'Business Analyst'),
     (N'UI/UX Designer'),
     (N'Data Scientist'),
     (N'DevOps Engineer'),
     (N'Technical Lead'),
     (N'System Architect'),
     (N'QA Engineer'),
     (N'Technical Writer'),
     (N'Scrum Master');


-- Thêm superAdmin
INSERT INTO [dbo].[Admin]
     ([email], [name], [gender], [birthday ], [password], [avatar])
VALUES
     ('adminsuper@system.com', N'Lê Văn Hùng', N'Nam', DATEADD(YEAR, -40, GETDATE()), 'hashed_password_1', 'https://avatar1.com');

-- Thêm Admin
INSERT INTO [dbo].[Admin]
     ([email], [name], [gender], [birthday ], [password], [avatar], [verificationCode],[superAdminId])
VALUES
     ('admin1@system.com', N'Nguyễn Trí Đức', N'Nam', DATEADD(YEAR, -30, GETDATE()), 'hashed_password_2', 'https://avatar2.com', 475867595, 1),
     ('admin2@system.com', N'Trần Thị Hà', N'Nữ', DATEADD(YEAR, -28, GETDATE()), 'hashed_password_3', 'https://avatar3.com', 574839712, 1),
     ('admin3@system.com', N'Phạm Ngọc Minh', N'Nữ', DATEADD(YEAR, -32, GETDATE()), 'hashed_password_4', 'https://avatar4.com', 798357471, 1),
     ('admin4@system.com', N'Hoàng Văn Hải', N'Nam', DATEADD(YEAR, -29, GETDATE()), 'hashed_password_5', 'https://avatar5.com', 470158473, 1);


-- Thêm Employee
INSERT INTO [dbo].[Employee]
     ([email], [name], [gender], [birthday], [phone], [address], [password], [avatar])
VALUES
     ('nguyendung@gmail.com', N'Nguyễn Dũng', N'Nam', DATEADD(YEAR, -25, GETDATE()), '0987654321', N'Đà Nẵng', 'hashed_password_1', 'https://avatar1.com'),
     ('lehuyen@gmail.com', N'Lê Thanh Huyền', N'Nữ', DATEADD(YEAR, -28, GETDATE()), '0987654322', N'Hà Nội', 'hashed_password_2', 'https://avatar2.com'),
     ('doanhung@gmail.com', N'Đoàn Trí Hùng', N'Nam', DATEADD(YEAR, -27, GETDATE()), '0987654323', N'TP.HCM', 'hashed_password_3', 'https://avatar3.com'),
     ('phamha@gmail.com', N'Phạm Thị Hà', N'Nữ', DATEADD(YEAR, -26, GETDATE()), '0987654324', N'Đà Nẵng', 'hashed_password_4', 'https://avatar4.com'),
     ('tranminh@gmail.com', N'Trần Cao Minh', N'Nam', DATEADD(YEAR, -29, GETDATE()), '0987654325', N'Hà Nội', 'hashed_password_5', 'https://avatar5.com'),
     ('hoangnam@gmail.com', N'Hoàng Nam', N'Nam', DATEADD(YEAR, -27, GETDATE()), '0987654326', N'TP.HCM', 'hashed_password_6', 'https://avatar6.com'),
     ('thuytrang@gmail.com', N'Thùy Trang', N'Nữ', DATEADD(YEAR, -25, GETDATE()), '0987654327', N'Hà Nội', 'hashed_password_7', 'https://avatar7.com'),
     ('ducmanh@gmail.com', N'Đức Mạnh', N'Nam', DATEADD(YEAR, -30, GETDATE()), '0987654328', N'Đà Nẵng', 'hashed_password_8', 'https://avatar8.com'),
     ('minhchau@gmail.com', N'Minh Châu', N'Nữ', DATEADD(YEAR, -28, GETDATE()), '0987654329', N'TP.HCM', 'hashed_password_9', 'https://avatar9.com'),
     ('anhtuan@gmail.com', N'Anh Tuấn', N'Nam', DATEADD(YEAR, -26, GETDATE()), '0987654330', N'Hà Nội', 'hashed_password_10', 'https://avatar10.com');

-- Thêm Education
INSERT INTO [dbo].[Education]
     ([school], [major], [description], [startDate], [endDate], [employeeId])
VALUES
     (N'Đại học Bách Khoa Hà Nội', N'Khoa học máy tính', N'Chuyên ngành phát triển phần mềm', '2015-09-01', '2019-06-30', 1),
     (N'Đại học FPT', N'Kỹ thuật phần mềm', N'Chuyên ngành AI', '2016-09-01', '2020-06-30', 2),
     (N'Đại học Công nghệ - ĐHQGHN', N'An toàn thông tin', N'Chuyên ngành bảo mật', '2015-09-01', '2019-06-30', 3),
     (N'Đại học Bách Khoa TP.HCM', N'Hệ thống thông tin', N'Chuyên ngành phân tích dữ liệu', '2016-09-01', '2020-06-30', 4),
     (N'Đại học Đà Nẵng', N'Công nghệ thông tin', N'Chuyên ngành phát triển web', '2015-09-01', '2019-06-30', 5),
     -- Hoang Nam có nhiều bằng cấp
     (N'Đại học RMIT', N'Computer Science', N'Chuyên ngành AI', '2015-09-01', '2019-06-30', 6),
     (N'Đại học Stanford Online', N'Data Science', N'Khóa học online', '2020-01-01', '2020-12-31', 6),
     -- Thuy Trang có nhiều bằng cấp
     (N'Đại học Ngoại thương', N'Quản trị kinh doanh', N'Chương trình chất lượng cao', '2016-09-01', '2020-06-30', 7),
     (N'FUNiX', N'Software Engineering', N'Chương trình từ xa', '2021-01-01', '2022-12-31', 7),
     -- Duc Manh có nhiều bằng cấp
     (N'Đại học Bách Khoa HN', N'Điện tử viễn thông', N'Hệ chính quy', '2014-09-01', '2019-06-30', 8);

-- Thêm Experience
INSERT INTO [dbo].[Experience]
     ([employeeId], [company], [position], [description], [url], [image], [startDate], [endDate])
VALUES
     (1, N'FPT Software', N'Junior Developer', N'Phát triển ứng dụng web using React', 'https://fpt-software.com', 'https://logo.fpt.com', '2019-07-01', '2021-06-30'),
     (2, N'Viettel', N'Mobile Developer', N'Phát triển ứng dụng di động using Flutter', 'https://viettel.com.vn', 'https://logo.viettel.com', '2020-07-01', '2022-06-30'),
     (3, N'VNG', N'Backend Developer', N'Phát triển API using NodeJS', 'https://vng.com.vn', 'https://logo.vng.com', '2019-07-01', '2021-06-30'),
     (4, N'Momo', N'Frontend Developer', N'Phát triển giao diện using Vue.js', 'https://momo.vn', 'https://logo.momo.vn', '2020-07-01', '2022-06-30'),
     (5, N'Tiki', N'Fullstack Developer', N'Phát triển ứng dụng using MERN stack', 'https://tiki.vn', 'https://logo.tiki.vn', '2019-07-01', '2021-06-30'),
     -- Hoang Nam có nhiều kinh nghiệm
     (6, N'Google Vietnam', N'Software Engineer', N'Phát triển ứng dụng Android', 'https://google.com', 'https://logo.google.com', '2019-07-01', '2021-06-30'),
     (6, N'Microsoft Vietnam', N'Senior Developer', N'Phát triển ứng dụng Cloud', 'https://microsoft.com', 'https://logo.microsoft.com', '2021-07-01', '2023-06-30'),
     -- Thuy Trang có nhiều kinh nghiệm
     (7, N'Amazon Vietnam', N'Product Manager', N'Quản lý sản phẩm E-commerce', 'https://amazon.com', 'https://logo.amazon.com', '2020-07-01', '2022-06-30'),
     (7, N'Lazada Vietnam', N'Business Analyst', N'Phân tích kinh doanh', 'https://lazada.vn', 'https://logo.lazada.com', '2022-07-01', '2023-06-30'),
     -- Duc Manh có nhiều kinh nghiệm
     (8, N'Intel Vietnam', N'System Engineer', N'Phát triển hệ thống nhúng', 'https://intel.com', 'https://logo.intel.com', '2019-07-01', '2023-06-30');

-- Thêm Certificate
INSERT INTO [dbo].[Certificate]
     ([name], [organization], [url], [image], [verifiedDate], [employeeId])
VALUES
     ('AWS Solutions Architect', 'Amazon', 'https://cert1.aws.com', 'https://img1.aws.com', '2022-01-15', 1),
     ('Google Cloud Engineer', 'Google', 'https://cert1.google.com', 'https://img1.google.com', '2022-02-20', 2),
     ('Azure Developer', 'Microsoft', 'https://cert1.azure.com', 'https://img1.azure.com', '2022-03-25', 3),
     ('CCNA', 'Cisco', 'https://cert1.cisco.com', 'https://img1.cisco.com', '2022-04-10', 4),
     ('Oracle Java Certificate', 'Oracle', 'https://cert1.oracle.com', 'https://img1.oracle.com', '2022-05-05', 5),
     -- Hoang Nam có nhiều chứng chỉ
     ('Microsoft Certified: Azure Developer', 'Microsoft', 'https://cert.microsoft.com/1', 'https://img.microsoft.com/1', '2022-06-15', 6),
     ('Google Associate Android Developer', 'Google', 'https://cert.google.com/1', 'https://img.google.com/1', '2022-07-20', 6),
     -- Thuy Trang có nhiều chứng chỉ
     ('Product Management Professional', 'PMI', 'https://cert.pmi.com/1', 'https://img.pmi.com/1', '2022-08-25', 7),
     ('Scrum Master Professional', 'Scrum.org', 'https://cert.scrum.org/1', 'https://img.scrum.org/1', '2022-09-10', 7),
     -- Duc Manh có nhiều chứng chỉ
     ('CompTIA Security+', 'CompTIA', 'https://cert.comptia.com/1', 'https://img.comptia.com/1', '2022-10-05', 8);

-- Thêm Employer
INSERT INTO [dbo].[Employer]
     ([email], [name], [gender], [birthday], [password], [department], [position], [companyId], [avatar], [hiringDate])
VALUES
     ('hr1@fpt.com', N'HR FPT', N'Nữ', DATEADD(YEAR, -30, GETDATE()), 'hashed_password_1', N'Nhân sự', N'HR Manager', 1, 'https://avatar1.com', GETDATE()),
     ('hr1@viettel.com', N'HR Viettel', N'Nam', DATEADD(YEAR, -35, GETDATE()), 'hashed_password_2', N'Nhân sự', N'HR Director', 2, 'https://avatar2.com', GETDATE()),
     ('hr1@vng.com', N'HR VNG', N'Nữ', DATEADD(YEAR, -32, GETDATE()), 'hashed_password_3', N'Nhân sự', N'HR Manager', 3, 'https://avatar3.com', GETDATE()),
     ('hr1@momo.com', N'HR Momo', N'Nam', DATEADD(YEAR, -28, GETDATE()), 'hashed_password_4', N'Nhân sự', N'HR Specialist', 4, 'https://avatar4.com', GETDATE()),
     ('hr1@tiki.com', N'HR Tiki', N'Nữ', DATEADD(YEAR, -33, GETDATE()), 'hashed_password_5', N'Nhân sự', N'HR Manager', 5, 'https://avatar5.com', GETDATE()),
     ('hr1@shopee.com', N'HR Shopee', N'Nữ', DATEADD(YEAR, -31, GETDATE()), 'hashed_password_6', N'Nhân sự', N'HR Manager', 6, 'https://avatar6.com', GETDATE()),
     ('hr1@sendo.com', N'HR Sendo', N'Nam', DATEADD(YEAR, -29, GETDATE()), 'hashed_password_7', N'Nhân sự', N'HR Specialist', 7, 'https://avatar7.com', GETDATE()),
     ('hr1@grab.com', N'HR Grab', N'Nữ', DATEADD(YEAR, -34, GETDATE()), 'hashed_password_8', N'Nhân sự', N'HR Director', 8, 'https://avatar8.com', GETDATE()),
     ('hr1@vnpay.com', N'HR VNPAY', N'Nam', DATEADD(YEAR, -27, GETDATE()), 'hashed_password_9', N'Nhân sự', N'HR Manager', 9, 'https://avatar9.com', GETDATE()),
     ('hr1@naver.com', N'HR Naver', N'Nữ', DATEADD(YEAR, -30, GETDATE()), 'hashed_password_10', N'Nhân sự', N'HR Lead', 10, 'https://avatar10.com', GETDATE());

-- Thêm RecruitmentPost
INSERT INTO [dbo].[RecruitmentPost]
     ([title], [description], [employerId], [datePosted], [deadline])
VALUES
     (N'Senior Java Developer', N'Tuyển Senior Java Developer cho dự án ngân hàng', 1, GETDATE(), '2024-12-31'),
     (N'React Native Developer', N'Tuyển React Native Developer cho dự án fintech', 2, GETDATE(), '2024-12-31'),
     (N'DevOps Engineer', N'Tuyển DevOps Engineer cho dự án cloud', 3, GETDATE(), '2024-12-31'),
     (N'Frontend Developer', N'Tuyển Frontend Developer cho dự án e-commerce', 4, GETDATE(), '2024-12-31'),
     (N'Fullstack Developer', N'Tuyển Fullstack Developer cho dự án startup', 5, GETDATE(), '2024-12-31'),
     -- HR Shopee đăng nhiều bài
     (N'Senior Android Developer', N'Tuyển Android Developer cho dự án Super App', 6, GETDATE(), '2024-12-31'),
     (N'Data Engineer', N'Tuyển Data Engineer cho dự án Big Data', 6, GETDATE(), '2024-12-31'),
     -- HR Sendo đăng nhiều bài
     (N'Product Manager', N'Tuyển Product Manager cho mảng Payment', 7, GETDATE(), '2024-12-31'),
     (N'UX Researcher', N'Tuyển UX Researcher cho team Product', 7, GETDATE(), '2024-12-31'),
     -- HR Grab đăng nhiều bài
     (N'Backend Engineer', N'Tuyển Backend Engineer cho dự án GrabFood', 8, GETDATE(), '2024-12-31');

-- Thêm JobDescription
INSERT INTO [dbo].[JobDescription]
     ([location], [level], [experience], [salary], [quantity], [employmentType], [gender], [recruitmentPostId])
VALUES
     (N'Đà Nẵng', N'Senior', N'5 năm', N'2000', 2, N'Full-time', N'Not required', 1),
     (N'Hà Nội', N'Middle', N'3 năm', N'1500', 3, N'Full-time', N'Not required', 2),
     (N'TP.HCM', N'Senior', N'4 năm', N'2500', 1, N'Full-time', N'Not required', 3),
     (N'Đà Nẵng', N'Middle', N'2 năm', N'1000', 4, N'Full-time', N'Not required', 4),
     (N'Hà Nội', N'Senior', N'5 năm', N'2000', 2, N'Full-time', N'Not required', 5),
     (N'TP.HCM', N'Senior', N'5 năm', N'3000', 3, N'Full-time', N'Not required', 6),
     (N'TP.HCM', N'Middle', N'3 năm', N'2000', 2, N'Full-time', N'Not required', 7),
     (N'Hà Nội', N'Senior', N'5 năm', N'2500', 1, N'Full-time', N'Not required', 8),
     (N'TP.HCM', N'Middle', N'3 năm', N'1500', 2, N'Full-time', N'Not required', 9),
     (N'Hà Nội', N'Senior', N'4 năm', N'2000', 3, N'Full-time', N'Not required', 10);

-- Thêm File (CV)
INSERT INTO [dbo].[File]
     ([name], [mimeType], [size], [url])
VALUES
     (N'CV_NguyenDung.pdf', 'application/pdf', 1024, 'https://storage.com/cv1.pdf'),
     (N'CV_LeThanhHuyen.pdf', 'application/pdf', 2048, 'https://storage.com/cv2.pdf'),
     (N'CV_DoanTriHung.pdf', 'application/pdf', 3072, 'https://storage.com/cv3.pdf'),
     (N'CV_PhamThiHa.pdf', 'application/pdf', 4096, 'https://storage.com/cv4.pdf'),
     (N'CV_TranCaoMinh.pdf', 'application/pdf', 1024, 'https://storage.com/cv5.pdf'),
     (N'CV_HoangNam.pdf', 'application/pdf', 2048, 'https://storage.com/cv6.pdf'),
     (N'CV_ThuyTrang.pdf', 'application/pdf', 3072, 'https://storage.com/cv7.pdf'),
     (N'CV_DucManh.pdf', 'application/pdf', 1536, 'https://storage.com/cv8.pdf'),
     (N'CV_MinhChau.pdf', 'application/pdf', 2560, 'https://storage.com/cv9.pdf'),
     (N'CV_AnhTuan.pdf', 'application/pdf', 1792, 'https://storage.com/cv10.pdf');

-- Thêm Record
INSERT INTO [dbo].[Record]
     ([title], [description], [ownerId], [fileCvId])
VALUES
     (N'Hồ sơ Java Developer', N'Hồ sơ ứng tuyển vị trí Java Developer', 1, 1),
     (N'Hồ sơ Mobile Developer', N'Hồ sơ ứng tuyển vị trí Mobile Developer', 2, 2),
     (N'Hồ sơ DevOps', N'Hồ sơ ứng tuyển vị trí DevOps Engineer', 3, 3),
     (N'Hồ sơ Frontend Developer', N'Hồ sơ ứng tuyển vị trí Frontend Developer', 4, 4),
     (N'Hồ sơ Fullstack Developer', N'Hồ sơ ứng tuyển vị trí Fullstack Developer', 5, 5),
     -- Hoang Nam có nhiều hồ sơ
     (N'Hồ sơ Senior Android Developer', N'Ứng tuyển vị trí Android Developer', 6, 6),
     (N'Hồ sơ Cloud Engineer', N'Ứng tuyển vị trí Cloud Engineer', 6, 6),
     -- Thuy Trang có nhiều hồ sơ
     (N'Hồ sơ Product Manager', N'Ứng tuyển vị trí Product Manager', 7, 7),
     (N'Hồ sơ Business Analyst', N'Ứng tuyển vị trí Business Analyst', 7, 7),
     -- Duc Manh có nhiều hồ sơ
     (N'Hồ sơ System Engineer', N'Ứng tuyển vị trí System Engineer', 8, 8);

-- Thêm RecordOnRecruitmentPost
INSERT INTO [dbo].[RecordOnRecruitmentPost]
     ([recordId], [recruitmentPostId], [job], [status])
VALUES
     (1, 1, N'Senior Java Developer', N'Đã chấp nhận'),
     (2, 2, N'React Native Developer', N'Đang chờ xét duyệt'),
     (3, 3, N'DevOps Engineer', N'Đã từ chối'),
     (4, 4, N'Frontend Developer', N'Đã chấp nhận'),
     (5, 5, N'Fullstack Developer', N'Đang chờ xét duyệt'),
     -- Hồ sơ của Hoang Nam ứng tuyển nhiều vị trí
     (6, 6, N'Senior Android Developer', N'Đang chờ xét duyệt'),
     (6, 7, N'Data Engineer', N'Đã chấp nhận'),
     -- Hồ sơ của Thuy Trang ứng tuyển nhiều vị trí
     (7, 8, N'Product Manager', N'Đang chờ xét duyệt'),
     (7, 9, N'UX Researcher', N'Đã từ chối'),
     -- Hồ sơ của Duc Manh ứng tuyển
     (8, 10, N'Backend Engineer', N'Đang chờ xét duyệt');

-- Thêm Evaluation
INSERT INTO [dbo].[Evaluation]
     ([recruitmentPostId], [employeeId], [rating], [saved])
VALUES
     (1, 1, 4.5, 1),
     (2, 2, 4.8, 1),
     (3, 3, 4.2, 0),
     (4, 4, 4.6, 1),
     (5, 5, 4.7, 0),
     -- Hoang Nam đánh giá nhiều bài đăng
     (6, 6, 4.7, 1),
     (7, 6, 4.3, 1),
     -- Thuy Trang đánh giá nhiều bài đăng
     (8, 7, 4.9, 1),
     (9, 7, 4.1, 0),
     -- Duc Manh đánh giá
     (10, 8, 4.5, 1);

-- Thêm RecruitmentPostPosition (Liên kết giữa bài đăng tuyển dụng và vị trí công việc)
INSERT INTO [dbo].[RecruitmentPostPosition]
     ([recruitmentPostId], [positionId])
VALUES
     -- Senior Java Developer post có thể yêu cầu Software Engineer và DevOps Engineer
     (1, 1),
     -- Software Engineer
     (1, 6),
     -- DevOps Engineer

     -- React Native Developer post cần Software Engineer
     (2, 1),
     -- Software Engineer

     -- DevOps Engineer post cần DevOps Engineer và Software Engineer
     (3, 6),
     -- DevOps Engineer
     (3, 1),
     -- Software Engineer

     -- Frontend Developer post cần Software Engineer và UI/UX Designer
     (4, 1),
     -- Software Engineer
     (4, 4),
     -- UI/UX Designer

     -- Fullstack Developer post cần nhiều vị trí
     (5, 1),
     -- Software Engineer
     (5, 6),
     -- DevOps Engineer
     (5, 4),
     -- UI/UX Designer
     -- Senior Android Developer post của Shopee
     (6, 1),
     -- Software Engineer
     (6, 2),
     -- Product Manager
     (6, 5),
     -- Data Scientist

     -- Data Engineer post của Shopee
     (7, 1),
     -- Software Engineer
     (7, 5),
     -- Data Scientist
     (7, 6),
     -- DevOps Engineer

     -- Product Manager post của Sendo
     (8, 2),
     -- Product Manager
     (8, 3),
     -- Business Analyst
     (8, 4),
     -- UI/UX Designer

     -- UX Researcher post của Sendo
     (9, 4),
     -- UI/UX Designer
     (9, 2),
     -- Product Manager

     -- Backend Engineer post của Grab
     (10, 1),
     -- Software Engineer
     (10, 6);
-- DevOps Engineer

-- Thêm ExperienceOnRecord (Liên kết giữa kinh nghiệm và hồ sơ)
INSERT INTO [dbo].[ExperienceOnRecord]
     ([experienceId], [recordId])
VALUES
     (1, 1),
     -- Kinh nghiệm FPT cho hồ sơ Java Developer
     (2, 2),
     -- Kinh nghiệm Viettel cho hồ sơ Mobile Developer
     (3, 3),
     -- Kinh nghiệm VNG cho hồ sơ DevOps
     (4, 4),
     -- Kinh nghiệm Momo cho hồ sơ Frontend Developer
     (5, 5),
     -- Kinh nghiệm Tiki cho hồ sơ Fullstack Developer
     -- Kinh nghiệm của Hoang Nam cho các hồ sơ
     (6, 6),
     -- Google Vietnam experience cho hồ sơ Android Developer
     (7, 6),
     -- Microsoft Vietnam experience cho hồ sơ Android Developer
     (6, 7),
     -- Google Vietnam experience cho hồ sơ Cloud Engineer
     (7, 7),
     -- Microsoft Vietnam experience cho hồ sơ Cloud Engineer

     -- Kinh nghiệm của Thuy Trang cho các hồ sơ
     (8, 8),
     -- Amazon Vietnam experience cho hồ sơ Product Manager
     (9, 8),
     -- Lazada Vietnam experience cho hồ sơ Product Manager
     (8, 9),
     -- Amazon Vietnam experience cho hồ sơ Business Analyst
     (9, 9),
     -- Lazada Vietnam experience cho hồ sơ Business Analyst

     -- Kinh nghiệm của Duc Manh cho hồ sơ
     (10, 10);
-- Intel Vietnam experience cho hồ sơ System Engineer
-- Thêm EducationOnRecord (Liên kết giữa học vấn và hồ sơ)
INSERT INTO [dbo].[EducationOnRecord]
     ([educationId], [recordId])
VALUES
     (1, 1),
     -- Học vấn Bách Khoa HN cho hồ sơ Java Developer
     (2, 2),
     -- Học vấn FPT cho hồ sơ Mobile Developer
     (3, 3),
     -- Học vấn ĐHCN-ĐHQGHN cho hồ sơ DevOps
     (4, 4),
     -- Học vấn Bách Khoa TP.HCM cho hồ sơ Frontend Developer
     (5, 5),
     -- Học vấn ĐH Đà Nẵng cho hồ sơ Fullstack Developer
     -- Học vấn của Hoang Nam cho các hồ sơ
     (6, 6),
     -- RMIT cho hồ sơ Android Developer
     (7, 6),
     -- Stanford Online cho hồ sơ Android Developer
     (6, 7),
     -- RMIT cho hồ sơ Cloud Engineer
     (7, 7),
     -- Stanford Online cho hồ sơ Cloud Engineer

     -- Học vấn của Thuy Trang cho các hồ sơ
     (8, 8),
     -- Đại học Ngoại thương cho hồ sơ Product Manager
     (9, 8),
     -- FUNiX cho hồ sơ Product Manager
     (8, 9),
     -- Đại học Ngoại thương cho hồ sơ Business Analyst
     (9, 9),
     -- FUNiX cho hồ sơ Business Analyst

     -- Học vấn của Duc Manh cho hồ sơ
     (10, 10);
-- Bách Khoa HN cho hồ sơ System Engineer
-- Thêm CertificateOnRecord (Liên kết giữa chứng chỉ và hồ sơ)
INSERT INTO [dbo].[CertificateOnRecord]
     ([certificateId], [recordId])
VALUES
     (1, 1),
     -- Chứng chỉ AWS cho hồ sơ Java Developer
     (2, 2),
     -- Chứng chỉ Google Cloud cho hồ sơ Mobile Developer
     (3, 3),
     -- Chứng chỉ Azure cho hồ sơ DevOps
     (4, 4),
     -- Chứng chỉ CCNA cho hồ sơ Frontend Developer
     (5, 5),
     -- Chứng chỉ Oracle cho hồ sơ Fullstack Developer
     -- Chứng chỉ của Hoang Nam cho các hồ sơ
     (6, 6),
     -- Azure Developer cert cho hồ sơ Android Developer
     (7, 6),
     -- Android Developer cert cho hồ sơ Android Developer
     (6, 7),
     -- Azure Developer cert cho hồ sơ Cloud Engineer
     (7, 7),
     -- Android Developer cert cho hồ sơ Cloud Engineer

     -- Chứng chỉ của Thuy Trang cho các hồ sơ
     (8, 8),
     -- Product Management cert cho hồ sơ Product Manager
     (9, 8),
     -- Scrum Master cert cho hồ sơ Product Manager
     (8, 9),
     -- Product Management cert cho hồ sơ Business Analyst
     (9, 9),
     -- Scrum Master cert cho hồ sơ Business Analyst

     -- Chứng chỉ của Duc Manh cho hồ sơ
     (10, 10); -- CompTIA Security+ cert cho hồ sơ System Engineer 