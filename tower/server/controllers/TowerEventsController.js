import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { towerEventsService } from "../services/TowerEventsService";
import { towerTicketsService } from "../services/TowerTicketsService";
import BaseController from "../utils/BaseController";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:eventId/tickets', this.getEventTickets)
      .get('/:eventId/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.cancel)
  }
  async getAll(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getAll(req.query)
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getById(req.params.id)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async getEventTickets(req, res, next) {
    try {
      const tickets = await towerTicketsService.getEventTickets({ eventId: req.params.eventId })
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async getEventComments(req, res, next) {
    try {
      const comments = await commentsService.get(req.params.eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.create(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const updated = await towerEventsService.edit(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }
  async cancel(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const toCancel = await towerEventsService.cancel(req.params.id, req.body.creatorId)
      return res.send(toCancel)
    } catch (error) {
      next(error)
    }
  }
}