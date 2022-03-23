<template>
  <form class="row d-flex" @submit.prevent="createEvent">
    <div class="col-12 mb-3 form-group">
      <label for="Event Name" class="form-label">Event Name</label>
      <input
        v-model="event.name"
        required
        type="text"
        name=""
        id=""
        class="form-control"
        placeholder="Event Name..."
        aria-describedby="helpId"
      />
    </div>
    <div class="col-12 mb-3">
      <label for="Event Body" class="form-label">Description</label>
      <input
        v-model="event.description"
        required
        type="textarea"
        name=""
        id=""
        class="form-control"
        placeholder="Description..."
        aria-describedby="helpId"
      />
    </div>
    <div class="col-4 mb-3">
      <label for="Cover Image" class="form-label">Cover Image</label>
      <input
        v-model="event.coverImg"
        type="text"
        name=""
        id=""
        class="form-control"
        placeholder="Cover Image URL..."
        aria-describedby="helpId"
      />
    </div>
    <div class="col-4 mb-3">
      <label for="Event Location" class="form-label">Event Location</label>
      <input
        v-model="event.location"
        type="text"
        name=""
        id=""
        class="form-control"
        placeholder="Event Location..."
        aria-describedby="helpId"
      />
    </div>
    <div class="col-4 mb-3">
      <label for="Event Capacity" class="form-label">Event Capacity</label>
      <input
        v-model="event.capacity"
        type="number"
        name=""
        id=""
        class="form-control"
        placeholder="0"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-4 mb-3">
      <label for="Event Start Date" class="form-label">Event Start Date</label>
      <input
        v-model="event.startDate"
        type="date"
        name=""
        id=""
        class="form-control"
        placeholder=""
        aria-describedby="helpId"
      />
    </div>
    <div class="col-4 mb-3">
      <label for="Event Type" class="form-label">Event Type</label>
      <input
        v-model="event.type"
        type="text"
        name=""
        id=""
        class="form-control"
        placeholder="0"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-4 offset-10">
      <button class="btn btn-info">Create</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { useRouter } from "vue-router"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
import { Modal } from "bootstrap"
export default {
  setup() {
    const router = useRouter()
    const event = ref({})
    return {
      event,
      async createEvent() {
        try {
          let newEvent = await eventsService.createEvent(event.value)
          Modal.getOrCreateInstance(document.getElementById("create-event")).hide();
          event.value = {}
          router.push({ name: "EventDetails", params: { id: newEvent.id } })
          logger.log(event.value)
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