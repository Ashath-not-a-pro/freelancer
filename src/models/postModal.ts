import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  topic: {
    type: String,
    Required: true
  },
  description: {
    type: String,
    Required: true
  },
  image: {
    type: String
  },
  user: {
    type: String
  }
}, { timestamps: true})

const PostModal = models.post || model('post', userSchema)

export default PostModal