import { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../config/s3";

export const getPresignedUrl = async (req: Request, res: Response) => {
  try {
    const { fileName, fileType } = req.query;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: "Missing fileName or fileType" });
    }

    //This may cause problems later VVV

    if (!(fileType as string).startsWith("video/")) {
      return res.status(400).json({ error: "Invalid file type" });
    }

    const key = `videos/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
      ContentType: fileType as string,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 }); // 60 seconds

    res.json({
      uploadUrl: url,
      key,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate pre-signed URL" });
  }
};
