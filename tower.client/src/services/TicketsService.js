import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService {
  async createTicket(ticketData) {
    const res = await api.post('api/tickets', ticketData)
    logger.log('ticket created', res.data)
    AppState.tickets.push(res.data)
    return res.send
  }
  async getEventTickets(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('got tickets for event', res.data)
    AppState.tickets = res.data
    return res.data
  }
  async deleteTicket(ticket) {
    const res = await api.delete(`api/tickets/${ticket.ticketId}`)
    AppState.tickets = AppState.tickets.filter(t => t.id !== ticket.ticketId)
  }
}
export const ticketsService = new TicketsService()