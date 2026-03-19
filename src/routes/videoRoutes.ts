import { Router } from "express";
import { getPresignedUrl } from "../controllers/videoController";

const router = Router();

router.get("/presigned-url", getPresignedUrl);

export default router;
