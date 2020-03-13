<template>
  <div id="app">
    <component :is="layout">
      <font-awesome-icon icon="user-secret" />
      <router-view/>
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    EmptyLayout,
    MainLayout
  }
}
</script>
<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~@fortawesome/fontawesome-free/css/all.min.css';
@import '../public/styles.css';

</style>