<template>
  <div
    class="shadow rounded mt-3 p-2 d-flex align-items-end img-fluid"
    :style="{
      'background-image': `url(${ticket.coverImg})`,
      height: '30vh',
    }"
  >
    <div class="p-2 bg-see-thru selectable w-100 rounded">
      <p class="m-0">
        {{ ticket.name }}
        <span
          @click="deleteTicket"
          class="badge bg-secondary"
          title="Delete Ticket"
        >
          <i class="mdi mdi-delete text-danger"></i>
        </span>
      </p>
      <p class="m-0">{{ ticket.location }}</p>
      <p class="m-0">{{ new Date(ticket.startDate).toLocaleDateString() }}</p>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { ticketsService } from "../services/TicketsService"
import { accountService } from "../services/AccountService"
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      tickets: computed(() => AppState.tickets),
      async deleteTicket() {
        try {
          if (await Pop.confirm('Delete your ticket?')) {
            await ticketsService.deleteTicket(props.ticket)
            await accountService.getMyTickets()
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
.bg-see-thru {
  background-color: rgba(25, 25, 112, 0.877);
}
</style>