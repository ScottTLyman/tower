import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TowerTicketsService {
  async create(body) {
    let event = await dbContext.TowerEvents.findById(body.eventId)
    if (event.capacity === 0) {
      throw new BadRequest('Event capacity reached')
    }
    const ticket = await dbContext.TowerTickets.create(body)
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
    const original = await dbContext.TowerTickets.findById(ticketId)
    if (original.accountId.toString() !== userId) {
      throw new Forbidden('Can only delete your own ticket')
    }
    let event = await dbContext.TowerEvents.findById(original.eventId)
    event.capacity = event.capacity += 1
    await event.save()
    await original.remove()
    return original
  }
}
export const towerTicketsService = new TowerTicketsService