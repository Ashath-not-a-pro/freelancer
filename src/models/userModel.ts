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
  },
  address: {
    type: String
  },
  skills: {
    type: Array<String>
  },
  photo: {
    type: String
  },
  email: {
    type: String
  },
  company_name: {
    type: String
  },
  company_description: {
    type: String
  }

}, { timestamps: true})

const UserModel = models.user || model('user', userSchema)

export default UserModel