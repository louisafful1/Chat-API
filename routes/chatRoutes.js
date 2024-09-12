import express from "express";
const chatRouter = express.Router();
import { sendMessage, getAllMessages, getAMessage, updateMessage, deleteMessage} from "../controllers/chatController.js";

// Routes
chatRouter.post("/", sendMessage)

chatRouter.get("/", getAllMessages)

chatRouter.get("/:id", getAMessage)

chatRouter.patch("/:id", updateMessage)

chatRouter.delete("/:id", deleteMessage)

export default chatRouter
