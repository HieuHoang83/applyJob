CREATE TRIGGER [dbo].[TR_Evaluation_UpdateRecruitmentPostStats]
ON [dbo].[Evaluation]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Tạo bảng tạm chứa recruitmentPostId bị ảnh hưởng
    DECLARE @AffectedPosts TABLE (recruitmentPostId INT);

    -- Thêm ID từ các bản ghi bị ảnh hưởng (inserted và deleted)
    INSERT INTO @AffectedPosts (recruitmentPostId)
    SELECT recruitmentPostId FROM inserted
    UNION
    SELECT recruitmentPostId FROM deleted;

    -- Cập nhật thống kê cho từng RecruitmentPost bị ảnh hưởng
    UPDATE rp
    SET 
        -- Đếm số lượng saved = 1
        totalSaved = (
            SELECT COUNT(*)
            FROM [dbo].[Evaluation] e
            WHERE e.recruitmentPostId = rp.id
            AND e.saved = 1
        ),
        -- Tính trung bình rating (chỉ tính các đánh giá có rating > 0)
        averageRating = (
            SELECT ROUND(AVG(CAST(e.rating AS FLOAT)), 2)
            FROM [dbo].[Evaluation] e
            WHERE e.recruitmentPostId = rp.id
            AND e.rating > 0
        )
    FROM [dbo].[RecruitmentPost] rp
    INNER JOIN @AffectedPosts ap ON rp.id = ap.recruitmentPostId;
END;

-- 1. Chuẩn bị Dữ liệu Test
-- Tạo dữ liệu mẫu cho RecruitmentPost
INSERT INTO [dbo].[RecruitmentPost] ([title], [description], [employerId], [datePosted], [deadline])
VALUES 
(N'Test Title 1', N'Test Description 1', 1, GETDATE(), '2024-12-31'),
(N'Test Title 2', N'Test Description 2', 2, GETDATE(), '2024-12-31');


-- Xem trạng thái ban đầu
SELECT id, title, totalSaved, averageRating 
FROM [dbo].[RecruitmentPost]
WHERE id IN (6, 7);

-- 2. Test Case 1: Thêm Đánh Giá Mới
-- Thêm các đánh giá cho Post 1
INSERT INTO [dbo].[Evaluation] (recruitmentPostId, employeeId, rating, saved)
VALUES 
(6, 1, 5, 1),  -- Đánh giá 5 sao và lưu
(6, 4, 4, 0),  -- Đánh giá 4 sao không lưu
(6, 5, 3, 1);  -- Đánh giá 3 sao và lưu

-- Kiểm tra kết quả
SELECT id, title, totalSaved, averageRating 
FROM [dbo].[RecruitmentPost]
WHERE id = 6;
-- Kết quả mong đợi: totalSaved = 2, averageRating = 4.0

-- 3. Test Case 2: Cập nhật Đánh Giá
-- Lưu ID đánh giá để update


-- Cập nhật đánh giá
UPDATE [dbo].[Evaluation]
SET rating = 2,
    saved = 0
WHERE id = 9;

-- Kiểm tra kết quả
SELECT id, title, totalSaved, averageRating 
FROM [dbo].[RecruitmentPost]
WHERE id = 6;
-- Kết quả mong đợi: totalSaved giảm 1, averageRating thay đổi

-- 4. Test Case 3: Xóa Đánh Giá
-- Xóa một đánh giá
DELETE FROM [dbo].[Evaluation]
WHERE id = 9;

-- Kiểm tra kết quả
SELECT id, title, totalSaved, averageRating 
FROM [dbo].[RecruitmentPost]
WHERE id = 6;
-- Kết quả mong đợi: totalSaved và averageRating được cập nhật

-- 5. Test Case 4: Nhiều Đánh Giá Cùng Lúc
-- Thêm nhiều đánh giá cho Post 2
INSERT INTO [dbo].[Evaluation] (recruitmentPostId, rating, saved)
VALUES 
(7, 5, 1),
(7, 4, 1),
(7, 3, 0),
(7, 5, 1),
(7, 2, 0);

-- Kiểm tra kết quả
SELECT id, title, totalSaved, averageRating 
FROM [dbo].[RecruitmentPost]
WHERE id = 7;
-- Kết quả mong đợi: totalSaved = 3, averageRating = 3.8

-- 6. Kiểm Tra Tổng Hợp
-- Xem tất cả các bài post và thống kê
SELECT 
    rp.id,
    rp.title,
    rp.totalSaved,
    rp.averageRating,
    (SELECT COUNT(*) FROM [dbo].[Evaluation] 
     WHERE recruitmentPostId = rp.id AND saved = 1) as ActualSaved,
    (SELECT AVG(CAST(rating AS FLOAT)) FROM [dbo].[Evaluation] 
     WHERE recruitmentPostId = rp.id AND rating > 0) as ActualAvgRating
FROM [dbo].[RecruitmentPost] rp
WHERE id IN (6, 7);