<template>
  <div
    class="shadow rounded mt-3 p-2 d-flex align-items-end img-fluid"
    :style="{
      'background-image': `url(${event.coverImg})`,
      height: '30vh',
    }"
  >
    <div class="p-2 bg-see-thru selectable w-100 rounded">
      <router-link :to="'/events/' + event.id" class="text-light">
        <p class="m-0">{{ event.name }}</p>
        <p class="m-0">{{ event.location }}</p>
        <p class="m-0">{{ new Date(event.startDate).toLocaleDateString() }}</p>
        <h2 v-if="event.isCanceled == true" class="text-danger fw-bold m-0">
          EVENT CANCELED
        </h2>
        <h2 v-else-if="event.capacity === 0" class="text-danger fw-bold m-0">
          SOLD OUT
        </h2>
        <p class="m-0" v-else>Tickets Available: {{ event.capacity }}</p>
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