import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  // Kiểm tra email hợp lệ
  @IsEmail()
  email: string;

  // Kiểm tra tên là chuỗi
  @IsString()
  name: string;

  // Kiểm tra mật khẩu: phải có ít nhất 6 ký tự
  @IsString()
  password: string;
}
