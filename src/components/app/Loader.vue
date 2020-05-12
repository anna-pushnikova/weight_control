<template>
  <div class="spinner d-flex justify-content-center text-center">
    <div class="spinner-grow spinner-color" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow spinner-color" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow spinner-color" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

.spinner {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100%;
}

.spinner-grow {
  width: 3rem !important;
  height: 3rem !important;
}

.spinner-color {
  color: rgb(92, 35, 145);
}
</style>