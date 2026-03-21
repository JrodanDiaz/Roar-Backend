import { Router } from "express";
import {
  getLikesAdmin,
  getUsersAdmin,
  getVideosAdmin,
} from "../controllers/adminController";

const router = Router();

router.get("/users", getUsersAdmin);
router.get("/videos", getVideosAdmin);
router.get("/likes", getLikesAdmin);

export default router;
