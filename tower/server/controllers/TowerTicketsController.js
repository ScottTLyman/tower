import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerTicketsService } from "../services/TowerTicketsService";
import BaseController from "../utils/BaseController";

export class TowerTicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)

  }
  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      // req.body.eventId = req.params.eventId
      const ticket = await towerTicketsService.create(req.body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const userId = req.userInfo.ID
      const ticketId = req.params.id
      await towerTicketsService.remove(ticketId, userId)
      return res.send('Ticket destroyed')
    } catch (error) {
      next(error)
    }
  }
}