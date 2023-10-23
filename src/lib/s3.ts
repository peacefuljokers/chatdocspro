import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { FetchHttpHandler } from "@smithy/fetch-http-handler";

export async function uploadToS3(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3Client({
        region: "ap-southeast-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
        //zzz added below to prevent fetch error from sdk
        requestHandler: new FetchHttpHandler({ keepAlive: false })
      });

      const file_key =
        "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

      const params = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
        Body: file,
      });
      
      await s3.send(params);
      
      const result = {
        file_key,
        file_name: file.name,
      };

      resolve(result);
 
    } catch (error) {
        console.log("failed to upload to S3",error);
        reject(error);
      
    }
  });
}

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${file_key}`;
  return url;
}