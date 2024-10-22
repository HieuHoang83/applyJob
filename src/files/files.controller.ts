import {
  Controller,
  Post,
  Body,
  Delete,
  ParseFilePipeBuilder,
  HttpStatus,
  Headers,
  HttpException
} from '@nestjs/common';
import { FilesService } from './files.service';
import { DeleteFileDto } from './dto/delete-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { Express } from 'express';
import { ResponseMessage } from 'src/decorators/customize';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@Controller({ path: 'files', version: '1' })
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // validate file type and size
  @Post('upload')
  @ResponseMessage('Upload file successfully!')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            /^(image\/jpg|image\/jpeg|image\/png|text\/plain|application\/pdf|application\/vnd.openxmlformats-officedocument.wordprocessingml.document)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5000 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Headers('folder_type') folder_type: string
  ) {
    if (!folder_type) {
      throw new HttpException(
        'Folder type is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.filesService.uploadFile(file, folder_type);
  }

  @Delete('delete')
  @ResponseMessage('Remove file successfully!')
  remove(
    @Body() deleteFileDto: DeleteFileDto
  ) {
    return this.filesService.remove(deleteFileDto);
  }
}
