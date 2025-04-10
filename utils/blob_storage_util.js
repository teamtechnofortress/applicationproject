import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({
  region: process.env.HETZNER_REGION,
  endpoint: process.env.HETZNER_ENDPOINT.startsWith('http')
    ? process.env.HETZNER_ENDPOINT
    : `https://${process.env.HETZNER_ENDPOINT}`,
  credentials: {
    accessKeyId: process.env.HETZNER_ACCESS_KEY,
    secretAccessKey: process.env.HETZNER_SECRET_KEY,
  },
  forcePathStyle: false,
});

// Upload buffer to Hetzner S3
export const uploadToHetzner = async (buffer, key, contentType) => {
  const command = new PutObjectCommand({
    Bucket: process.env.HETZNER_BUCKET,
    Key: `uploads/${key}`,
    Body: buffer,
    ACL: 'public-read',
    ContentType: contentType,
  });

  await s3.send(command);
  return `${process.env.HETZNER_ENDPOINT}/${process.env.HETZNER_BUCKET}/uploads/${key}`;
};

// Upload one or more .jpg/.jpeg/.png files
export const handleFileUpload = async (fileInput) => {
  if (!fileInput) return [];

  const fileList = Array.isArray(fileInput) ? fileInput : [fileInput];
  const urls = [];

  for (const file of fileList) {
    if (file && file.filepath && file.originalFilename) {
      const ext = path.extname(file.originalFilename).toLowerCase();

      let contentType;
      if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      else if (ext === '.png') contentType = 'image/png';
      else {
        console.warn(`❌ Skipping unsupported file type: ${file.originalFilename}`);
        continue;
      }

      try {
        const fileContent = fs.readFileSync(file.filepath);
        const uniqueName = `${uuidv4()}_${file.originalFilename}`;
        const fileUrl = await uploadToHetzner(fileContent, uniqueName, contentType);
        urls.push(fileUrl);
      } catch (error) {
        console.error(`❌ Error uploading file: ${file.originalFilename}`, error);
      }
    }
  }

  return urls;
};

export const deletefile = async (id) => {
    if (!id) return;
  
    const params = {
      Bucket: process.env.HETZNER_BUCKET,
      Key: `uploads/${id}`,
    };
  
    try {
      await s3.send(new DeleteObjectCommand(params));
      return { success: true, key: id };
    } catch (error) {
      console.error('Delete error:', error);
      throw new Error('Failed to delete file: ' + error.message);
    }
  };
