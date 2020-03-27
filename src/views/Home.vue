<template>
  <div class="contain-loader">
    <Loader v-if="loading" />
   
    <div class="row text-center" v-show="!loading">
      <div class="col-xl-12">
        <div class="card mb-4">
          <div class="card-header">
            <i class="fas fa-chart-bar pr-2"></i>Weight Data
          </div>
          <div class="card-body">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">START</th>
                  <th scope="col">CURRENT</th>
                  <th scope="col">GOAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{startVal}}</td>
                  <td>{{currentVal}}</td>
                  <td>{{goal}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="row text-center" v-show="!loading && this.records.length">
      <div class="col-xl-12">
        <div class="card mb-4">
          <div class="card-header">
            <i class="fas fa-chart-area pr-2"></i>Weight Progress
          </div>
          <div class="card-body">
            <canvas id="myAreaChart" width="100%" height="40" ref="canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import Loader from "@/components/app/Loader.vue";

export default {
  data: () => ({
    currentVal: null,
    records: [],
    startVal: null,
    goal: null,
    loading: true
  }),
  components: {
    Loader
  },
  extends: Line,
  async mounted() {
    // Fetch records
    this.records = await this.$store.dispatch('fetchRecords')

    // If there is not any record all fields are empty
    if(!this.records.length) {
      this.currentVal = '-'
      this.startVal = '-'
      this.goal = this.$store.getters.info.goal
      this.loading = false
      return
    }

    // Count fields
    this.currentVal = this.records[this.records.length - 1].weight;
    this.startVal = this.records[0].weight
    this.goal = this.$store.getters.info.goal
    
    // Render chart function
    this.renderChart({
      labels: this.records.map(r => r.date),
      datasets: [
        {
          label: "Kg",
          data: this.records.map(r => r.weight),
          backgroundColor: [
            "rgba(172, 151, 221, 0.6)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(189, 63, 105, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(93, 39, 224, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ],
      options: {
        responsive: true
      }
    })

    this.loading = false;
  }
};
</script>

<style>

Loader {
  position: absolute;
}
</style>