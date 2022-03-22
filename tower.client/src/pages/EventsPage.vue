<template>
  <div class="row justify-content-center">
    <img
      src="https://media.istockphoto.com/photos/concert-stage-people-are-visible-waving-and-clapping-silhouettes-are-picture-id1194060639?k=20&m=1194060639&s=612x612&w=0&h=x-0MqkUFwRVvf52GtrM23XrD02r-MB2y_hlOKaQVvvs="
      alt="event cover image"
      class="img-fluid rounded"
    />

    <div class="row">
      <div class="col-12 col-md-4" v-for="e in events" :key="e.id">
        <Event :event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { eventsService } from '../services/EventsService'
import { computed, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
export default {
  name: 'Home',
  setup() {
    watchEffect(async () => {
      try {
        await eventsService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
