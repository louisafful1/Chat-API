import asyncHandler from "express-async-handler"

const sendMessage = (req, res) => {
    res.send("Yh, i am")

}

export { sendMessage }