import { Schema, models, model } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        // match: [String, 'Invalid username: it must containe 8 - 20 alphanumeric letters and must be unique']
    },
    image: {
        type: String
    }
})

const User = models.User || model('User', UserSchema)

export default User;