import {DeleteObjectCommand, S3Client} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function uploadFileToS3UsingUploadUtility(file: Express.Multer.File, name: string): Promise<string | null> {
    try {
        if (!file || !file.buffer) {
            throw new Error("File or file buffer is missing");
        }
        const sizeLimit = 10 * 1024 * 1024; // 10 MB in bytes
        if (file.buffer.length > sizeLimit) {
            throw new Error("File size exceeds the 10 MB limit");
        }

        let contentType = 'application/octet-stream';
        if (name.endsWith('.jpeg') || name.endsWith('.jpg')) {
            contentType = 'image/jpeg';
        } else if (name.endsWith('.png')) {
            contentType = 'image/png';
        }

        const uploader = new Upload({
            client: s3Client,
            params: {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: name,
                Body: file.buffer,
                ACL: 'public-read',
                ContentType: contentType,
            },
        });

        await uploader.done();

        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodeURIComponent(name)}`;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
}


export async function deleteS3Object(oldImageKey: string): Promise<void> {
    const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: oldImageKey,
    };
    await s3Client.send(new DeleteObjectCommand(deleteParams));
}