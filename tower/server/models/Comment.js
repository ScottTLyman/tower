import { Schema } from "mongoose";

export const CommentSchema = new Schema(
  {
    body: { type: String, required: true },
    eventId: { type: Schema.Types.ObjectId, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
    isAttending: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})