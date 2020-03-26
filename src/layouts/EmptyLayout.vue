<template>
<div class="bg-primary">
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <div class="container">
          <div class="row justify-content-center">
            <router-view/>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>

</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      ('Что-то пошло не так')
    }
  }
}
</script>

<style>

</style>




