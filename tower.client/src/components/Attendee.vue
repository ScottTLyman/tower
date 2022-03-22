<template>
  <div class="m-0">
    <img :src="ticket.picture" style="height: 45px; width: 45px" alt="" />
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