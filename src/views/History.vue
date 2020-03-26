<template>
  <div class="row text-center contain-loader">
    <Loader
      v-if="loading"
    />
    <div 
      class="col-xl-12"
      v-else
    >
      <div class="card-body">
        <table class="table table-hover">
          <tbody>
            <Dropdown 
              class="text-left"
              @click="onClick"
            />
            <tr 
            v-for="his in history"
            :key="his.id"
            >
              <td>{{his.date}}</td>
              <td>{{his.change}}</td>
              <td>{{his.weight + ' kg'}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/app/Loader.vue'

export default {
  name: 'History',
  data: () => ({
    loading: true,
    history: []
  }),
  components: { 
    Dropdown: () => import('./../components/Dropdown.vue'),
    Loader
  },
  async mounted() {
    this.history = await this.$store.dispatch('fetchRecords')
    this.loading = false
  },
  methods: {
    async onClick() {
      this.loading = true
      const id = this.history[this.history.length - 1].id
      await this.$store.dispatch('deleteRecord', { id })
      this.history = await this.$store.dispatch('fetchRecords')

      
      this.loading = false
      this.$toasted.show(
        'Last record was deleted!', {
          icon: 'check'
        })
    }
  }
}
</script>

<style scoped>
</style>