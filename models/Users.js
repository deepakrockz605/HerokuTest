const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firsr_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', UserSchema)