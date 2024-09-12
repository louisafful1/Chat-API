import express from "express"
import { authUSer } from "../controllers/userController.js"
const userRouter = express.Router()

userRouter.post("/auth", authUSer)

export default userRouter