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
    change: null,
    remaining: null,
    average: null,
    allTimeHigh: null,
    allTimeLow: null,
    measurements: null,
    loading: true
  }),
  components: {
    Loader
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const firstRecord = records[0].weight
    const lastRecord = records[records.length - 1].weight
    this.change = lastRecord - firstRecord
    if (this.change > 0) {
      this.change = `+${this.change}`
    }
    const goal = this.$store.getters.info.goal
    this.remaining = goal - firstRecord
    
    this.measurements = records.length
    this.average = (records.reduce((total, r) => (total += r.weight), 0) / this.measurements).toFixed(1)
    
    const weightArr = records.map(r => r.weight)
    this.allTimeLow = weightArr.reduce((prev, next) => Math.min(prev, next))
    this.allTimeHigh = weightArr.reduce((prev, next) => Math.max(prev, next))
    this.loading = false

  }
}
</script>

<style>

</style>