<template>
  <div class="row">
    <div class="col-6">
      <div>
        <h1>
          {{ event.name }}
        </h1>
        <h6>{{ event.description }}</h6>
      </div>
      <div>
        <h4 class="">Sprints</h4>
      </div>
    </div>
    <div class="col-6 d-flex flex-column justify-content-end">
      <button
        class="btn btn-info offset-8"
        data-bs-toggle="modal"
        data-bs-target="#create-sprint"
      >
        Add Sprint
      </button>
    </div>
  </div>
</template>


<script>
import { useRoute, useRouter } from "vue-router"
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>