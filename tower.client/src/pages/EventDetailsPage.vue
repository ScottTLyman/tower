<template>
  <div class="row bg-secondary p-2 ms-2 shadow rounded mb-2 img-fluid">
    <div class="col-3 p-0">
      <img :src="event.coverImg" alt="" class="img-fluid rounded" />
    </div>
    <div class="col-9 d-flex flex-column justify-content-between">
      <div class="d-flex justify-content-between">
        <div>
          <div class="d-flex">
            <h3>
              {{ event.name }}
            </h3>
            <p class="ms-2">A {{ event.type }} Event</p>
          </div>
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
      <h2
        v-if="event.isCanceled == true"
        class="d-flex text-danger bg-light justify-content-center"
      >
        EVENT CANCELED!!EVENTCANCELED!!
      </h2>
      <h2
        v-else-if="event.capacity <= 0"
        class="d-flex text-danger bg-light justify-content-center"
      >
        SOLD OUT!!SOLD OUT!!SOLD OUT!!SOLD OUT!!
      </h2>
      <div v-else class="d-flex justify-content-between">
        <div>
          <h5>{{ event.capacity }} Tickets Left</h5>
        </div>
      </div>
      <div class="d-flex">
        <div
          class="me-2"
          v-if="account.id == event.creatorId && !event.isCanceled"
        >
          <button
            data-bs-toggle="modal"
            data-bs-target="#edit-event"
            class="btn btn-info fw-bold"
          >
            <i class="mdi mdi-pencil" title="Edit Event"></i>
          </button>
        </div>
        <div>
          <Modal id="edit-event">
            <template #title>Edit Event</template>
            <template #body><EditEvent /></template>
          </Modal>
        </div>
        <div v-if="account.id == event.creatorId && !event.isCanceled">
          <button @click="cancelEvent" class="btn btn-outline-danger">
            Cancel
          </button>
        </div>
        <div
          v-if="!hasTicket && event.isCanceled == false && user.isAuthenticated"
        >
          <button @click="createTicket" class="btn btn-outline-info fw-bold">
            Attend <i class="mdi mdi-account-check"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="row ms-2 mb-2">
    <h5 class="ms-2 fw-bold text-primary">Attendees</h5>
    <div
      v-if="tickets.length !== 0"
      class="d-flex justify-content-start shadow rounded bg-secondary p-2"
    >
      <div class="mx-1" v-for="t in tickets" :key="t.id">
        <Attendee :ticket="t" />
      </div>
      <!-- attendees here, v-for above -->
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-10 bg-secondary">
      <h3>Comments</h3>
      <div class="d-flex col-12 mb-3 form-group">
        <label for="Comment" class="form-label"></label>
        <input
          v-model="comment.body"
          type="text"
          class="form-control me-2"
          placeholder="Say Something..."
          aria-label="Say Something..."
          aria-describedby="button-addon2"
          title="Say Something..."
        />
        <button
          @click="createComment"
          class="btn btn-outline-success"
          type="button"
          id="button-addon2"
        >
          <i class="mdi mdi-check"></i>
        </button>
      </div>
      <div class="col-12" v-for="c in comments" :key="c.id">
        <Comment :comment="c" />
        <!-- comments here -->
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { useRoute, useRouter } from "vue-router"
import { eventsService } from "../services/EventsService"
import { ticketsService } from "../services/TicketsService"
import { commentsService } from "../services/CommentsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { popScopeId, watchEffect } from "@vue/runtime-core"
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const comment = ref({
      eventId: route.params.id
    })
    const ticket = ref({
      eventId: route.params.id,
    })
    watchEffect(async () => {
      try {
        if (route.params.id) {
          await eventsService.getEventById(route.params.id)
          await ticketsService.getEventTickets(route.params.id)
          await commentsService.getEventComments(route.params.id)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      ticket,
      comment,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      event: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets),
      hasTicket: computed(() => AppState.tickets.find(t => t.accountId == t.id)),
      comments: computed(() => AppState.comments),
      async createTicket() {
        try {
          await ticketsService.createTicket(ticket.value, route.params.id)
          await eventsService.getEventById(route.params.id)
          await ticketsService.getEventTickets(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async createComment() {
        try {
          await commentsService.createComment(comment.value, route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async cancelEvent() {
        try {
          if (await Pop.confirm("Cancel your event?")) {
            await eventsService.cancelEvent(route.params.id)
            await eventsService.getEventById(route.params.id)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>