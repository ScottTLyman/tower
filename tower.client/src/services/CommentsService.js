import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
  async createComment(commentData) {
    const res = await api.post(`api/comments`, commentData)
    logger.log('commented', res.data)
    AppState.comments.push(res.data)
  }
  async getEventComments(id) {
    const res = await api.get(`api/events/${id}/comments`)
    logger.log('got event comments', res.data)
    AppState.comments = res.data
    return res.data
  }
  async deleteComment(comment) {
    const res = await api.delete(`api/comments/${comment.id}`)
    AppState.comments = AppState.comments.filter(c => c.id !== comment.id)
  }
}
export const commentsService = new CommentsService()