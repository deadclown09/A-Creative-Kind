import { Schema, models, model } from 'mongoose'

const UserSchema = newSchema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Invalid username: it must containe 8 - 20 alphanumeric letters and must be unique']
    }
})

const User = models.User || model('User', UserSchema)

export default User;