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

  async uploadFile(file: Express.Multer.File, folder_type: string) {
    const storage = getStorage();
    const path = `${folder_type}/${file.originalname}`;
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
          url: downloadURL,
          size: file.size,
          mimeType: file.mimetype,
          folderType: folder_type,
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
    } catch (error) {
      throw new HttpException('File not found', 404);
    }
  }
}
