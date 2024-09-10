import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId, 
        required: [true, "This field must not be empty"],
        // ref: "User", 
      },      
    message: {
        type: String,
        required: [true, "Please Enter a message"],
        trim: true,
    },
    status: {
        type: String,
        enum: ["sent", "read"],
        default: "sent",
      },
    recipient: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "This field must not be empty"],
        //   ref: "User",
        },
}, {timestamps: true}
)

const Chat = mongoose.model("Chat", chatSchema)

export default Chat