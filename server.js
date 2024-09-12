import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import chatRouter from "./routes/chatRoutes.js";
import {notFound,errorHandler} from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRoute.js";
dotenv.config();
const chatapp = express();

// middlewares
chatapp.use(express.json()); 
chatapp.use(express.urlencoded({extended: true}))
chatapp.use(cookieParser())

// Routes
chatapp.use("/api/messages", chatRouter)
chatapp.use("/api/users", userRouter)

//Error handler
chatapp.use(notFound)
chatapp.use(errorHandler)

//Port
const PORT = process.env.PORT || 5000

//Database connection
mongoose
.connect(process.env.MONGO_URI)
.then(() =>{
    chatapp.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
.catch((error) => {
console.error(error)
process.exit(1)
}
)



