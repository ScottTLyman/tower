<template>
  <span class="">
    <button
      class="
        btn btn-success
        selectable
        shadow
        lighten-30
        text-uppercase
        my-2 my-lg-0
      "
      @click="login"
      v-if="!user.isAuthenticated"
    >
      Login
    </button>

    <div class="bg-dark lighten-10 my-2 my-lg-0" v-else>
      <!-- <div
        class="dropdown-toggle selectable"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="authDropdown"
      > -->
      <div
        class="
          d-flex
          flex-column
          align-items-center
          mt-2
          bg-dark
          lighten-10
          fw-bold
        "
      >
        <div>
          <img
            :src="account.picture"
            alt="account photo"
            style="max-height: 9vh; max-width: 9vh"
            class="rounded img-fluid"
          />
        </div>
        <div>
          <router-link :to="{ name: 'Home' }">
            <div class="hoverable my-2">Home</div>
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'Account' }">
            <div class="hoverable my-2">Account</div>
          </router-link>
        </div>
        <div class="hoverable text-danger my-2" @click="logout">
          <button
            class="btn btn-secondary fw-bold"
            aria-label="LogOut"
            aria-labelledby="LogOut"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </span>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
</style>
