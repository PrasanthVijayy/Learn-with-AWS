import { S3Client, PutObjectCommand, ListObjectsCommand} from "@aws-sdk/client-s3";
import { saveFileRecord } from "../services/fileService.js";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({ region: process.env.AWS_REGION });

export const uploadFile = async (req, res) => {
  try {
    console.log("uploadFile controller started");
    const file = req.file;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    };

    const command = new PutObjectCommand(uploadParams);
    const result = await s3.send(command);

    const fileData = {
      fileName: file.originalname,
      filePath: uploadParams.Key,
      fileSize: file.buffer.length, // Adjusted to use buffer length
      fileExtension: file.originalname.split(".").pop(),
      bucketName: process.env.S3_BUCKET_NAME,
    };

    await saveFileRecord(fileData);
    console.log("uploadFile controller ended");
    res
      .status(200)
      .json({ message: "File uploaded successfully", data: result });
  } catch (error) {
    res.status(500).json({ error: "Error uploading file: " + error.message });
  }
};

export const listFiles = async (req, res) => {
  try {
    console.log("listFiles controller started");

    const listParams = {
      Bucket: process.env.S3_BUCKET_NAME,
    };

    const command = new ListObjectsCommand(listParams);
    const result = await s3.send(command);

    // Assuming files are returned as an array in result.Contents
    const files = result.Contents.map((file) => ({
      fileName: file.Key,
      filePath: file.Key,
      fileSize: file.Size,
      fileExtension: file.Key.split(".").pop(),
      bucketName: process.env.S3_BUCKET_NAME,
    }));
    console.log("listFiles controller ended");

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: "Error fetching files: " + error.message });
  }
};
