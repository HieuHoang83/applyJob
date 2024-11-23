import { HttpException, Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage';
import { DeleteFileDto } from './dto/delete-file.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private readonly prismaservice: PrismaService) {
    initializeApp({
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      databaseURL: process.env.FIRESTORE_DB_URL,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const storage = getStorage();
    const path = `cv/${file.originalname}`;
    const storageRef = ref(storage, path);
    // Create file metadata including the content type
    const metadata = {
      contentType: file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata,
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    try {
      return await this.prismaservice.file.create({
        data: {
          name: file.originalname,
          url: downloadURL,
          size: file.size,
          mimeType: file.mimetype
        },
      });
    } catch (error) {
      throw new HttpException('File not uploaded', 400);
    }
  }

  async remove(deleteFileDto: DeleteFileDto) {
    const filePath = deleteFileDto.filePath;
    const storage = getStorage();
    const storageRef = ref(storage, filePath);
    try {
      await deleteObject(storageRef);
      const file = await this.prismaservice.file.findFirst({
        where: {
          url: filePath,
        },
      });
      if (!file) {
        throw new HttpException('File not found', 404);
      }
      await this.prismaservice.file.delete({
        where: {
          id: file.id
        },
      });
    } catch (error) {
      throw new HttpException('File not found', 404);
    }
  }

  async findOne(req: { url: string }) {
    const file = await this.prismaservice.file.findFirst({
      where: {
        url: req.url,
      },
    });
    return file;
  }
}
