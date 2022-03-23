import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async getMyTickets() {
    const res = await api.get('/account/tickets')
    logger.log('got my tickets', res.data)
    AppState.tickets = res.data
  }
  // async getMyEvents() {
  //   const res = await api.get('/account/events')
  //   logger.log('got my events', res.data)
  //   AppState.events = res.data
  // }
}

export const accountService = new AccountService()
