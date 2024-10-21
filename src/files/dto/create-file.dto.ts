import { IsNotEmpty } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  folderType: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  mimetype: string;
}
