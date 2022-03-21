import { Schema } from "mongoose";

export const TowerTicketSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
TowerTicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true })
TowerTicketSchema.virtual('towerEvent', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'TowerEvent'
})
TowerTicketSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})