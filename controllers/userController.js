import asyncHandler from "express-async-handler";

// @desc Auth User/set token
// @route POST/api/users/auth
// @access Public
const authUSer = asyncHandler( async(req, res) => {
    res.status(200).json({message: "hello user"})
})

export {
    authUSer
}
