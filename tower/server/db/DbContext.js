import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { TowerEventSchema } from "../models/TowerEvent";
import { TowerTicketSchema } from "../models/TowerTicket";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema);
  TowerTickets = mongoose.model('TowerTicket', TowerTicketSchema)

}

export const dbContext = new DbContext()
