<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark lighten-10 px-3">
    <div class="d-flex align-items-center text-primary">
      <img
        alt="logo"
        src="https://cdn3.iconfinder.com/data/icons/buildings-places/512/Venue-512.png"
        height="45"
        class=""
      />
      <h1 class="ms-2">TOWER EVENTS</h1>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto"></ul>
      <!-- LOGIN COMPONENT HERE -->
    </div>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
