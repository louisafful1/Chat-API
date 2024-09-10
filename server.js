import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import messageRoutes from "./routes/messageRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
dotenv.config();
const chatapp = express();

// middlewares
chatapp.use(express.json()); 
chatapp.use(express.urlencoded({extended: true}))

// Route
chatapp.use("/api/messages", messageRoutes)

//Error handler
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



