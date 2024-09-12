import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from "bcrypt"
// @desc Auth User/set token
// @route POST/api/users/auth
// @access Public
const authUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body
  
    //  Validations
if (!email || !password) {
    res.status(400)
    throw new Error("Please fill in all required fields")
    
}

const user = await User.findOne({email})
    // Check if user exists
    if (!user) {
        res.status(401);
        throw new Error("Invalid Email or password");
    }

const passwordIsCorrect = await bcrypt.compare(password, user.password)

if(user && passwordIsCorrect) {
    generateToken(res, user._id)
    res.status(200).json({
       _id: user._id,
       name: user.name,
       email: user.email 
    })
}else{
    res.status(401)
    throw new Error("Invalid Email or password")

}

})

// @desc  Register a new user
// @route POST/api/users
// @access Public
const registerUser = asyncHandler( async(req, res) => {
 const {name, email, password} =req.body

//  Validations
if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please fill in all required fields")
    
}
const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    if(password.length < 8){
        res.status(400)
        throw new Error("Password must not be less than 8")
  
    }

    const user = await User.create({
        name, email, password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
           _id: user._id,
           name: user.name,
           email: user.email 
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// @desc  Logout user
// @route POST/api/users
// @access Public
const logoutUser = asyncHandler( async(req, res) => {
    res.cookie("cookie", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: "Successfully logged out"}) //204 for no content

})


// @desc  Get user profile
// @route GET/api/users/profile
// @access private
const getUserProfile = asyncHandler( async(req, res) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user)
})

// @desc  update user profile
// @route PUT/api/users/profile
// @access private
const updateUserProfile = asyncHandler( async(req, res) => {
  const user = await User.findById(req.user._id)


  if(user) {
    user.name = req.body.name || user.name,
    user.email = req.body.email || user.email

    const updatedUser = await user.save()

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
    })
  }else{
    res.status(404)
    throw new Error("User not found")
  }
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile

}
