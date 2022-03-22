<template>
  <div
    class="shadow rounded mt-3 p-2 d-flex align-items-end img-fluid"
    :style="{
      'background-image': `url(${event.coverImg})`,
      height: '30vh',
    }"
  >
    <div class="p-2 bg-see-thru selectable w-100">
      <router-link :to="'/events/' + event.id" class="text-light">
        <p class="m-0">{{ event.name }}</p>
        <p class="m-0">{{ event.location }}</p>
        <p class="m-0">{{ new Date(event.startDate).toLocaleDateString() }}</p>
        <p class="m-0" v-if="event.capacity > 0">
          Tickets Available: {{ event.capacity }}
        </p>
        <h2 v-else class="text-danger fw-bold m-0">SOLD OUT</h2>
      </router-link>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>


<style lang="scss" scoped>
.bg-see-thru {
  background-color: rgba(25, 25, 112, 0.877);
}
</style>