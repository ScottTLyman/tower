<template>
  <div class="m-0">
    <img
      :src="ticket.picture"
      style="height: 45px; width: 45px"
      class="rounded-circle"
      alt=""
      aria-label="ticket.name"
      :title="ticket.name"
    />
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      tickets: computed(() => AppState.tickets)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>