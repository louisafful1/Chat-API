import asyncHandler from "express-async-handler"
import Message from "../models/messageModel.js"

// send a message
const sendMessage = asyncHandler(async(req, res) => {
const { message }= req.body

// Validation
if(!message){
    res.status(400)
    throw new Error("Please enter a message")
}
const createMessage = await Message.create({message})
res.status(201).json({createMessage})

})

//Get all messages
const getAllMessages = asyncHandler(async(req, res) => {
const messages = await Message.find().sort("-createdAt")
res.status(200).json({messages})

})

//Get one message
const getAMessage = asyncHandler(async(req, res) => {
const message = await Message.findById(req.params.id)

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
    if (!message) {
        res.status(400);
        throw new Error("Please provide a message to update");
      }
    const existingMessage = await Message.findById(req.params.id)

    if(!existingMessage) {
        res.status(404)
        throw new Error("Message not found")  
    }

    const updatedMessage = await Message.findByIdAndUpdate(
        {_id:req.params.id},
         {message}, 
         {new: true, runValidators:true}
    )

    res.status(200).json({updatedMessage})


    
    })

//Delete single message
const deleteMessage = asyncHandler(async(req, res) => {
    const existingMessage = await Message.findById(req.params.id)

    if(!existingMessage) {
        res.status(404)
        throw new Error("Message not found")  
    }
   await Message.findByIdAndDelete(req.params.id)
   res.status(200).json({success: true, message: "Message deleted successfully" })
    
    })


export { sendMessage, getAllMessages, getAMessage, updateMessage, deleteMessage}