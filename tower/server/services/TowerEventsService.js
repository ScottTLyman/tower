import { originAgentCluster } from "helmet"
import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TowerEventsService {
  async getAll(query = {}) {
    const towerEvents = await dbContext.TowerEvents.find(query).populate('creator', 'name picture')
    return towerEvents
  }
  async getById(id) {
    const towerEvent = await dbContext.TowerEvents.findById(id).populate('creator', 'name picture')
    if (!towerEvent) {
      throw new BadRequest('Invalid Event ID')
    }
    return towerEvent
  }
  async create(body) {
    const timeNow = new Date()
    const towerEvent = await dbContext.TowerEvents.create(body)
    if (timeNow >= new Date(body.createdAt)) {
      throw new BadRequest('Event date must be in future')
    }
    await towerEvent.populate('creator', 'name picture')
    return towerEvent
  }
  async edit(body) {
    const original = await dbContext.TowerEvents.findById(body.id)
    if (original.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('This is not your Event!')
    }
    if (original.isCanceled) {
      throw new BadRequest('Event has already been canceled')
    }
    original.name = body.name ? body.name : original.name
    original.description = body.description ? body.description : original.description
    await original.save()
    return original
  }
  async cancel(eventId, userId) {
    const original = await dbContext.TowerEvents.findById(eventId)
    if (original.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your Event!')
    }
    original.isCanceled = !original.isCanceled
    await original.save()
    return original.isCanceled
  }
}
export const towerEventsService = new TowerEventsService()