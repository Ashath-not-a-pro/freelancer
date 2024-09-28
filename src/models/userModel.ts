import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    Required: true
  },
  password: {
    type: String,
    Required: true
  },
  mobile: {
    type: Number,
    Required: true,
    unique: true
  },
  user_type: {
    type: String,
    Required: true
  }

}, { timestamps: true})

const UserModel = models.user || model('user', userSchema)

export default UserModel