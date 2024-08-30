// routes/fileRoute.js
import express from "express";
import multer from "../utils/multer.js";
import { uploadFile, listFiles } from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", multer.single("file"), uploadFile);
router.get("/list", listFiles);

export default router;
