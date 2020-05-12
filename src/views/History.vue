<template>
  <div class="row text-center contain-loader">
    <Loader
      v-if="loading"/>
    <div 
      class="col-xl-12"
      v-else> 
      <p v-if="!this.history.length"> 
        You have not records yet
      </p>
      <div 
        class="card-body"
        v-else>

        <Dropdown 
          class="text-left"
          @delete="onClick"/>
        
        <recordCard
          v-for="(item, key) in records"
          :key="key"
          :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/app/Loader.vue'
import Dropdown from '@/components/app/HistoryDropdown.vue'
import firebase from 'firebase/app'
import recordCard from '@/components/RecordsByMonth.vue'
import dateFilter from '@/filter/date.filter.js'

const itemsPerPage = 2

export default {
  data: () => ({
    history: [],
    loading: false,
    records: []
  }),

  components: { 
    Dropdown,
    Loader,
    recordCard
  },

  async created() { 
    await this.loadHistory()

    let dates = []

    this.history.forEach(record => {
      record.date = new Date(record.date)
      const datetime = `${record.date.getMonth()}-${record.date.getFullYear()}`
      
      let date = dates.find(date => {
        return date.datetime === datetime
      })

      if (!date) {
        dates.push({
          datetime,
          items: [record]
        })
      } else {
        date.items.push(record)
      } 
    })
    this.records = dates
  },

  methods: {

    async loadHistory() {
      this.loading = true
      this.history = await this.$store.dispatch('fetchRecords')
      this.loading = false
    },

    async onClick() {
      this.loading = true
      // Delete record by id
      const id = this.history[this.history.length - 1].id
      await this.$store.dispatch('deleteRecord', { id })
      // Fetch records
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

<style lang="scss">
.pagination {
  display: flex;
  align-items: center;
}

.page-item.active .page-link {
  background-color :#6610f2 !important;
  border-color: #6f42c1 !important;
}
</style>
