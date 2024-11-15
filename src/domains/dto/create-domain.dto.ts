import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateDomainDto {
  // Kiểm tra tên là chuỗi

  @IsString()
  name?: string;

  // Kiểm tra mật khẩu: phải có ít nhất 6 ký tự
  @IsString()
  description: string;
}

export class CreateMultipleDomainsDto {
  domains: CreateDomainDto[];
}
