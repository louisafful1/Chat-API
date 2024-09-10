import asyncHandler from "express-async-handler"
import Chat from "../models/chatModel.js"

// send a message
const sendMessage = asyncHandler(async(req, res) => {
const { sender, message, status, recipient }= req.body

// Validations
if(!sender || !message || !status || !recipient){
    res.status(400)
    throw new Error("Please enter all required fields")
}

const createMessage = await Chat.create({sender, message, status, recipient})
res.status(201).json({createMessage})

})

//Get all messages
const getAllMessages = asyncHandler(async(req, res) => {
const messages = await Chat.find().sort("-createdAt")
res.status(200).json({messages})

})

//Get one message
const getAMessage = asyncHandler(async(req, res) => {
const message = await Chat.findById(req.params.id)

// Validation
if(!message) {
    res.status(404)
    throw new Error("Message not found")  
}
res.status(200).json({message})
})

//Update message
const updateMessage = asyncHandler(async(req, res) => {
    const {message} = req.body

    // Validations
    const existingMessage = await Chat.findById(req.params.id)

    if(!existingMessage) {
        res.status(404)
        throw new Error("Message not found")  
    }

    if (!message) {
        res.status(400);
        throw new Error("Please provide a message to update");
      }

    const updatedMessage = await Chat.findByIdAndUpdate(
        {_id:req.params.id},
         {message}, 
         {new: true, runValidators:true}
    )

    res.status(200).json({updatedMessage})

    
    })

//Delete single message
const deleteMessage = asyncHandler(async(req, res) => {
    const existingMessage = await Chat.findById(req.params.id)

    if(!existingMessage) {
        res.status(404)
        throw new Error("Message not found")  
    }
   await Chat.findByIdAndDelete(req.params.id)
   res.status(200).json({success: true, message: "Message deleted successfully" })
    
    })


export { sendMessage, getAllMessages, getAMessage, updateMessage, deleteMessage}
