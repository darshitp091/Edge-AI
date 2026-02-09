import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// 🌐 Cloudflare R2 Client Initialization
// R2 is S3-compatible, so we use the standard S3 Client
const r2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME!;

/**
 * Generates a pre-signed URL for direct frontend-to-R2 upload.
 * This is the high-performance SaaS approach for large neural weights.
 */
export async function getUploadUrl(fileName: string, contentType: string) {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `uploads/${Date.now()}-${fileName}`,
        ContentType: contentType,
    });

    // URL expires in 1 hour
    return await getSignedUrl(r2, command, { expiresIn: 3600 });
}

/**
 * Generates a download URL for an optimized neural artifact.
 */
export async function getDownloadUrl(key: string) {
    const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
    });

    return await getSignedUrl(r2, command, { expiresIn: 3600 });
}

export default r2;
