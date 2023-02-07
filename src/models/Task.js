import mongoose from 'mongoose'
import { ETaskStatus } from '../enums/ETaskStatus'

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name.'],
    },
    description: {
      type: String,
    },
    taskboard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'taskboards',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    status: {
      type: String,
      enum: ETaskStatus,
      default: ETaskStatus.TODO,
    },
    position: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: {
      virtuals: true,
    },
  },
)

taskSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.__v
  return obj
}

export const Task = mongoose.model('tasks', taskSchema)
