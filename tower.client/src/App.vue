<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid flex-grow-1 bg-dark">
    <div class="row">
      <div class="col-11">
        <router-view />
      </div>
      <div class="col-1">MOVE LOGIN HERE</div>
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
