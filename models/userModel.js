import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [8, "Password must not be less than 8"]
    }
}, {timestamps: true}

);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword

      
})


const User = mongoose.model("User", userSchema)

export default User