import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CommentsService {
  async create(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator', 'name picture')
    return comment
  }
  async get(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
    return comments
  }
  async remove(id, userId) {
    const original = await dbContext.Comments.findById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Not your comment!')
    }
    await original.remove()
    return original
  }

}
export const commentsService = new CommentsService()