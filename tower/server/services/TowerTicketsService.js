import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TowerTicketsService {
  async create(body) {
    const ticket = await dbContext.TowerTickets.create(body)
    let event = await dbContext.TowerEvents.findById(body.eventId)
    event.capacity = event.capacity -= 1
    await event.save()
    return ticket
  }
  async getMyTickets(query = {}) {
    const myTickets = await dbContext.TowerTickets.find(query).populate('towerEvent')
    return myTickets.map(mongooseDocument => {
      const myTicket = mongooseDocument.toJSON()
      return {
        eventId: myTicket.eventId,
        accountId: myTicket.accountId,
        ticketId: myTicket.id,
        ...myTicket.towerEvent
      }
    })
  }
  async getEventTickets(query = {}) {
    const eventTickets = await dbContext.TowerTickets.find(query).populate('account', 'name picture')
    return eventTickets.map(mongooseDocument => {
      const eventTicket = mongooseDocument.toJSON()
      return {
        eventId: eventTicket.eventId,
        accountId: eventTicket.accountId,
        ticketId: eventTicket.id,
        ...eventTicket.account
      }
    })
  }
  async remove(ticketId, userId) {
    await this.getMyTickets(ticketId)
    if (ticketId.creatorId.toString() !== userId) {
      throw new Forbidden('Can only delete your own ticket')
    }
    await dbContext.TowerTickets.findByIdAndDelete(ticketId)
  }
}
export const towerTicketsService = new TowerTicketsService