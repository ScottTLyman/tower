<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid flex-grow-1 bg-dark lighten-10">
    <div class="row">
      <div class="col-10 d-flex flex-column justify-content-between">
        <router-view />
      </div>
      <div class="col-2">
        <Login />
      </div>
    </div>
  </main>
  <footer></footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
