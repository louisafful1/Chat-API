import express from "express";
const router = express.Router();
import { sendMessage } from "../controllers/messageControllers.js";


router.get("/", sendMessage)

export default router