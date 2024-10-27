import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateRecruitmentPostDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string; // Tuyển dụng vị trí gì

  @IsNotEmpty()
  @IsString()
  description: string; // Mô tả công việc

  @IsNotEmpty()
  @IsString()
  location: string; // Địa điểm làm việc

  @IsOptional()
  @IsString()
  level: string = 'staff'; // Junior, Senior, Intern (default: staff)

  @IsNotEmpty()
  @IsString()
  experience: string; // Kinh nghiệm (1 year, 2 years, etc.)

  @IsNotEmpty()
  salary: string; // Lương

  @IsOptional()
  @IsNumber()
  quantity: number = 1; // Số lượng tuyển dụng (default: 1)

  @IsNotEmpty()
  @IsString()
  employmentType: string; // Full-time, Part-time, Remote

  @IsOptional()
  @IsString()
  gender: string = 'Not required'; // Yêu cầu giới tính (default: Not required)

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  datePosted: Date; // Ngày đăng tin

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  deadline: Date; // Hạn nộp đơn
}