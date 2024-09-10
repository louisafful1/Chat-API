import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import messageRoutes from "./routes/messageRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();

// middleware
app.use(express.json())

// Routes
app.use("/api/messages", messageRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
mongoose
.connect(process.env.MONGO_URI)
.then(
    app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
)
.catch((error) => console.log(error))



