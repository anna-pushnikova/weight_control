<template>
<div class="contain-loader">
  <Loader
    v-if="loading"
  />
  <div v-else>
    <div class="breadcrumb mb-4 text-center">
      <table class="table table-borderless">
        <thead>
          <tr>
            <th>CHANGE</th>
            <th>REMAINING</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{change}}</td>
            <td>{{remaining}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row text-center">
      <div class="col-xl-12">
        <div class="card mb-4">
          <div class="card-header">
            <i class="fas fa-wave-square pr-2"></i> Overall
          </div>
          <div class="card-body">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">AVERAGE</th>
                  <th scope="col">ALL-TIME HIGH</th>
                  <th scope="col">ALL-TIME LOW</th>
                  <th scope="col">MEASUREMENTS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{average}}</td>
                  <td>{{allTimeHigh}}</td>
                  <td>{{allTimeLow}}</td>
                  <td>{{measurements}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>  
    </div>
  </div>
</div>
</template>

<script>
import Loader from '@/components/app/Loader.vue'

export default {
  data: () => ({
    change: '',
    remaining: null,
    average: null,
    allTimeHigh: null,
    allTimeLow: null,
    measurements: null,
    loading: true,
    records: []
  }),
  components: {
    Loader
  },
  async mounted() {
    // Fetch records 
    this.records = await this.$store.dispatch('fetchRecords')

    // If there is not any record all fields are empty
    if(!this.records.length) {
      this.change = '-'
      this.remaining = '-'
      this.measurements = '-'
      this.average = '-'
      this.allTimeHigh = '-'
      this.allTimeLow = '-'
      this.loading = false
      return 
    }

    // Count change between first and last records
    const firstRecord = this.records[0].weight
    const lastRecord = this.records[this.records.length - 1].weight
    this.change = lastRecord - firstRecord
    if (this.change > 0) {
      this.change = `+${this.change}`
    }

    // Count remaining value to achieve goal
    const goal = this.$store.getters.info.goal
    this.remaining = goal - firstRecord
    
    // Count measurements been taken
    this.measurements = this.records.length

    // Count records' average value 
    this.average = (this.records.reduce((total, r) => (total += r.weight), 0) / this.measurements).toFixed(1)
    
    // Count all-time-low and all-time-high weight
    const weightArr = this.records.map(r => r.weight)
    this.allTimeLow = weightArr.reduce((prev, next) => Math.min(prev, next))
    this.allTimeHigh = weightArr.reduce((prev, next) => Math.max(prev, next))

    this.loading = false
  }
}
</script>

<style>

</style>