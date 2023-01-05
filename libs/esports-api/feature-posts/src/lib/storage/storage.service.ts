import { Storage } from '@google-cloud/storage';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly storage = new Storage();
  private bucketName = 'post-attachments';

  async onModuleInit() {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = 'gcloud-storage-svc.json';
    await this.createBucket();
  }

  private async createBucket() {
    const bucketRef = this.storage.bucket(this.bucketName);
    const bucketExists = await this.storage.bucket(this.bucketName).exists();
    if (!bucketExists) {
      await bucketRef.create({
        archive: false,
        storageClass: 'standard',
        location: 'europe-west3',
      });
    }
  }

  async uploadFile(contents: Buffer, originalFileName: string): Promise<string> {
    const parts = originalFileName.split('.');
    const extension = parts[parts.length - 1];
    const uuid = uuidv4();
    const destFileName = `${uuid}.${extension}`;
    await this.storage.bucket(this.bucketName).file(destFileName).save(contents);
    return destFileName;
  }

  async getPresignedUrl(fileName: string): Promise<string> {
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    } as const;

    // Get a v4 signed URL for reading the file
    const [url] = await this.storage.bucket(this.bucketName).file(fileName).getSignedUrl(options);
    return url;
  }

  async deleteFile(fileName: string) {
    await this.storage.bucket(this.bucketName).file(fileName).delete();
  }
}
