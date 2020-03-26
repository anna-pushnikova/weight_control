<template>
  <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Weight Control</router-link>
    <button
      class="btn btn-link btn-sm order-1 order-lg-0"
      id="sidebarToggle"
      @click.prevent="$emit('click')"
    >
      <i class="fas fa-bars"></i>
    </button>
    <ul class="navbar-nav ml-auto">
      <dropdown
        @logout="logout"
      >
      </dropdown>
      

    </ul>
  </nav>
</template>

<script>
import dropdown from './NavDropdown'

export default {
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  components: {
    dropdown
  }

}
</script>

<style>
</style>