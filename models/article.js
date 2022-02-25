const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    banner: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    createdByID: {
        type: String,
        required: true
    },
    createdByName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Article", articleSchema)