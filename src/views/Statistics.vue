<template>
<div class="contain-loader">
  <Loader
    v-if="loading"
  />
  <div class="container mt-5 text-center" v-else>
    <vue-speedometer
      v-if="this.records.length"
      :width="500"
      :height="330"
      :dimensionUnit="'px'"
      :needleHeightRatio="0.8"
      :maxSegmentLabels="2"
      :segments="3"
      :value="+this.bmi"
      :maxValue="40.0"
      :minValue="16.0"
      :segmentColors="['#21a6f3','#40bc64', '#fc5449']"
      :ringWidth="70"
      :textColor="'#9e9e9e'"
      :needleColor="'#dfdfdf'"
      :needleTransitionDuration="4000"
      needleTransition="easeElastic"
      :customSegmentStops="[16, 18.5, 25, 40]"
    />
    <div 
      class="box mb-5"
      v-if="this.records.length"
    >
      <div class="tag">
        <div class="color blue"></div>
        <span>Underweight</span>
      </div>
      <div class="tag">
        <div class="color green"></div>
        <span>Normal</span>
      </div>
      <div class="tag">
        <div class="color red"></div>
        <span>Overweight</span>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-xl-12">
        <div class="card mb-4">
          <div class="card-header">
            <i class="fas fa-weight pr-2"></i> Body Mass Index
          </div>
          <div class="card-body">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">NORMAL WEIGHT</th>
                  <th scope="col">DIFFERENCE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{getCategory}}</td>
                  <td>{{getNormalWeight}}</td>
                  <td>{{countDiff}}</td>
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
import VueSpeedometer from "vue-speedometer"
import Loader from '@/components/app/Loader.vue'

export default {
  components: { 
    VueSpeedometer,
    Loader
  },
  data: () => ({
    categories: ['underweight', 'normal', 'overweight'],
    normalWeightLow: null,
    normalWeightHigh: null,
    difference: null,
    records: [],
    bmi: null,
    currWeight: null,
    loading: true
  }),
  async mounted() {
    // Fetch records
    this.records = await this.$store.dispatch('fetchRecords')
    
    // If there is not any record all fields are empty
    if(!this.records.length) {
      this.loading = false
      return 
    }
    
    // Count fields
    this.currWeight = this.records[this.records.length - 1].weight
    this.height = this.$store.getters.info.height
    this.bmi = (this.currWeight / (this.height/100) ** 2).toFixed(1)
     
    this.loading = false
  },
  computed: {
    getCategory() {
      // If there is not any records field is empty
      if(!this.records.length) {
        return '-'
      }
      // Count Category
      if(this.bmi < 18.5) {
        return this.categories[0]
      } else if (this.bmi > 18.5 && this.bmi < 25) {
        return this.categories[1]
      } else {
        return this.categories[2]
      }
    },
    countDiff() {
      // If there is not any records field is empty
      if(!this.records.length) {
        return '-'
      }

      // Count BMI
      if(this.bmi > 18.5 && this.bmi < 25) {
        return `You have normal weight`
      }

      // Count low and high limits of normal weight for the current user
      this.normalWeightLow = (18.5 * (this.height/100) ** 2).toFixed(0)
      this.normalWeightHigh = (25 * (this.height/100) ** 2).toFixed(0)
      if(this.bmi < 18.5) {
        return this.normalWeightLow - this.currWeight 
      } else {
        return this.currWeight - this.normalWeightHigh
      }
    },
    getNormalWeight() {
      // If there is not any records field is empty
      if(!this.records.length) {
        return '-'
      }

      // Count normal weight
      if(this.bmi > 18.5 && this.bmi < 25) {
        return `You have normal weight`
      } else if (this.bmi < 18.5) {
        return this.normalWeightLow = (18.5 * (this.height/100) ** 2).toFixed(1)
      } else {
        return this.normalWeightHigh = (25 * (this.height/100) ** 2).toFixed(1)
      }
    }
  }
}

</script>

<style scoped>

.box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: space-evenly
}

.tag {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.color {
  display: block;
  height: 20px;
  width: 30px;
  margin-right: 20px;
}

.color.blue {
  background-color: #21a6f3;
}

.color.green {
  background-color: #40bc64;
}

.color.red {
  background-color: #fc5449;
}
</style>