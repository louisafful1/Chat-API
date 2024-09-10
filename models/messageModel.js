import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
    message: {
        type: String,
        required: [true, "Please Enter a message"],
        trim: true,
    }
}, {timestamps: true}
)

const Message = mongoose.model("Message", messageSchema)

export default Message