const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: Date.now().toString()
    },
    email: {
        type: String,
        required: true,
        unique: true
        
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)