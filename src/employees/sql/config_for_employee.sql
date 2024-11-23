-- Truncate table Employee      
TRUNCATE TABLE [dbo].[Employee];
-- Reset identity
DBCC CHECKIDENT ('[dbo].[Employee]', RESEED, 5);
DBCC CHECKIDENT ('[dbo].[EmployeeAuditLog]', RESEED, 0);
DBCC CHECKIDENT ('[dbo].[Evaluation]', RESEED, 8);
DBCC CHECKIDENT ('[dbo].[RecruitmentPost]', RESEED, 5);
-- Drop procedures
DROP PROCEDURE IF EXISTS dbo.sp_CreateEmployee;
DROP PROCEDURE IF EXISTS dbo.sp_UpdateEmployee;
DROP PROCEDURE IF EXISTS dbo.sp_DeleteEmployee;

-- Drop function
-- DROP FUNCTION dbo.CalculateApplicationSuccess;
DROP FUNCTION IF EXISTS dbo.CalculateApplicationSuccess;

-- Drop trigger
-- DROP TRIGGER dbo.Trigger_UpdateEmployee;
DROP TRIGGER IF EXISTS TR_RecordApplication_Limit;
DROP TRIGGER IF EXISTS TR_RecruitmentPost_TagLimit;
DROP TRIGGER IF EXISTS TR_Employee_RecordLimit;
DROP TRIGGER IF EXISTS TR_Employee_AuditAndSecurity;
DROP TRIGGER IF EXISTS TR_Evaluation_UpdateRecruitmentPostStats;


