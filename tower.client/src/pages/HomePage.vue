<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-center">
      <img
        src="https://media.istockphoto.com/photos/concert-stage-people-are-visible-waving-and-clapping-silhouettes-are-picture-id1194060639?k=20&m=1194060639&s=612x612&w=0&h=x-0MqkUFwRVvf52GtrM23XrD02r-MB2y_hlOKaQVvvs="
        alt=""
        class="img-fluid"
      />
    </div>
    <div class="row">
      <div class="col-3">event</div>
      <div class="col-3">event</div>
      <div class="col-3">event</div>
      <div class="col-3">event</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
