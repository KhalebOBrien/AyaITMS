import mongoose from 'mongoose'
import { EWorkspacePurpose } from '../enums/EWorkspacePurpose'

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a Name.'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    members: {
      type: [
        { 
          type : mongoose.Schema.Types.ObjectId, 
          ref: "users"
        }
      ]
    },
    purpose: {
      type: String,
      enum: EWorkspacePurpose,
      default: EWorkspacePurpose.PERSONAL,
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

workspaceSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.__v
  return obj
}

export const Workspace = mongoose.model('workspaces', workspaceSchema)
