import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
  async createEvent(eventData) {
    const res = await api.post('api/events', eventData)
    logger.log('event data', res)
    AppState.events.push(res.data)
    return res.data

  }
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
  async editEvent(updateBody, id) {
    const res = await api.put(`api/events/${id}`, updateBody)
    logger.log('edit event', res.data)
    AppState.activeEvent = res.data
  }
  async cancelEvent(id) {
    const res = await api.delete(`api/events/${id}`)
    logger.log('event canceled', res.data)
    AppState.activeEvent = res.data
    return res.data
  }

}
export const eventsService = new EventsService()