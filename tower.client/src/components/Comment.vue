<template>
  <div class="bg-secondary d-flex ms-2 mb-2">
    <img
      :src="comment.creator.picture"
      alt=""
      style="height: 65px; width: 65px"
      class="rounded shadow"
      :title="comment.creator.name"
    />
    <div class="bg-light ms-2 py-0 rounded p-1 w-100">
      <h6>{{ comment.creator.name }}</h6>
      <p>{{ comment.body }}</p>
    </div>
    <i
      v-if="comment.creatorId == account.id"
      @click="deleteComment"
      class="mdi mdi-close selectable"
    ></i>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { commentsService } from "../services/CommentsService"
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteComment() {
        try {
          if (await Pop.confirm('Did you say something BAD?')) {
            await commentsService.deleteComment(props.comment)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      notes: computed(() => AppState.comments),
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>