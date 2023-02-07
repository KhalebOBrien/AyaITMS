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
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks',
      },
    ],
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

// taskboardSchema.virtual('boardTasks', {
//   ref: 'task', // The model to use
//   localField: '_id', // Find tasks where `localField`
//   foreignField: 'taskboard', // is equal to `foreignField`
// })

taskboardSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.__v
  return obj
}

export const TaskBoard = mongoose.model('taskboards', taskboardSchema)
