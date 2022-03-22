<template>
  <div class="row bg-secondary p-2 ms-2 shadow rounded mb-2">
    <div class="col-3 p-0">
      <img :src="event.coverImg" alt="" class="img-fluid rounded" />
    </div>
    <div class="col-9 d-flex flex-column justify-content-between">
      <div class="d-flex justify-content-between">
        <div>
          <h3>
            {{ event.name }}
          </h3>
          <h6>{{ event.location }}</h6>
        </div>
        <div>
          <h6>{{ new Date(event.startDate).toLocaleDateString() }}</h6>
          <p>{{ new Date(event.startDate).toLocaleTimeString() }}</p>
        </div>
      </div>
      <div>
        <h6 class="">
          {{ event.description }}
        </h6>
      </div>
      <h2 v-if="event.capacity < 0" class="text-danger">SOLD OUT</h2>
      <div v-else class="d-flex justify-content-between">
        <h5>{{ event.capacity }} Tickets Left</h5>
        <button class="btn btn-outline-info fw-bold">
          Attend <i class="mdi mdi-account-check"></i>
        </button>
      </div>
    </div>
  </div>
  <h5 class="ms-2 fw-bold text-primary">Attendees</h5>
  <div
    class="d-flex justify-content-start shadow rounded bg-secondary ms-1 p-2"
  >
    <div class="mx-1" v-for="t in tickets" :key="t.id">
      <Attendee :ticket="t" />
    </div>
    <!-- attendees here, v-for above -->
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { useRoute, useRouter } from "vue-router"
import { eventsService } from "../services/EventsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { watchEffect } from "@vue/runtime-core"
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    watchEffect(async () => {
      try {
        if (route.params.id) {
          await eventsService.getEventById(route.params.id)
          await eventsService.getAttendees(route.params.id)
          await eventsService.getAll()
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      event: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>