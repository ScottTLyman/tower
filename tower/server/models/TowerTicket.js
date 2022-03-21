import { Schema } from "mongoose";

export const TowerTicketSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, required: true },
    accountId: { type: Schema.Types.ObjectId, required: true }
  }
)