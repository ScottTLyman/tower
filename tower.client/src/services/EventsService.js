import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
  async getAll() {
    const res = await api.get('api/events')
    logger.log('got events', res.data)
    AppState.events = res.data
  }
  async getEventById(id) {
    const res = await api.get(`api/events/${id}`)
    logger.log('got the event', res.data)
    AppState.activeEvent = res.data
  }
  async getAttendees(id) {
    const res = await api.get(`api/events/${id}/tickets`)
    logger.log('got attendees', res.data)
    AppState.tickets = res.data
  }
}
export const eventsService = new EventsService()