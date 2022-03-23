<template>
  <div class="row">
    <div class="d-flex flex-column align-items-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded img-fluid" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-4" v-for="t in tickets" :key="t.id">
      <MyTicket :ticket="t" />
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { eventsService } from "../services/EventsService"
import { accountService } from "../services/AccountService"
export default {
  name: 'Account',
  setup() {
    watchEffect(async () => {
      // await accountService.getMyEvents()
      await accountService.getMyTickets()
    })
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
