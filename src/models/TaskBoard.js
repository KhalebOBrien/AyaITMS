import mongoose from 'mongoose'

const taskboardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a Title.'],
    },
    description: {
      type: String,
    },
    color: {
      type: String,
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'workspaces',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    tasks: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'tasks',
        },
      ],
    },
    deleted: {
      type: Boolean,
      default: false,
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

taskboardSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.__v
  return obj
}

export const TaskBoard = mongoose.model('taskboard', taskboardSchema)
