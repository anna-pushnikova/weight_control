<template>
  <form @submit.prevent="submitHandler">
    <div class="form-group">
      <label for="datepicker">Select date to record the results</label>
      <Datepicker
        :bootstrap-styling="true"
        v-model="date"
        :placeholder="'Select Date'"
        clear-button
        calendar-button
        required
        :calendar-button-icon="'fa fa-calendar'"
        id="datepicker"
      />
      <small v-if="$v.date.$dirty && !$v.date.required" class="form-text text-muted">Date should be selected</small>
    </div>
    <div class="form-group">
      <label for="weight-value-input">Enter weight value</label>
      <input
        type="number"
        class="form-control"
        id="weight-value-input"
        placeholder="Enter weight value"
        min="1"
        max="500"
        v-model.number="weight"
      />
      <small v-if="$v.weight.$dirty && !$v.weight.required" class="form-text text-muted weight-value">Weight field should be selected</small>
    </div>

    <button type="submit" class="btn btn-primary">Confirm</button>
  </form>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { required } from 'vuelidate/lib/validators/'
import dateFilter from '@/filter/date.filter.js'
import { mapActions } from 'vuex'

export default {
  components: {
    Datepicker
  },
  validations: {
    date: { required },
    weight: { required }
  },
  data: () => ({
    date: null,
    weight: '',
    prevWeight: null,
    change: null,
    records: null
  }),
  methods: {
    ...mapActions(['createRecord', 'fetchRecords']),
    async submitHandler() {

      if(this.$v.$invalid) {
        this.$v.$touch()
        return 
      }

      this.records = await this.fetchRecords()
      
      if(!this.records.length) {
        this.change = '-' 
      await this.createRecord ({
        date: dateFilter(this.date),
        change: this.change,
        weight: this.weight
      })

      this.prevWeight = this.records[this.records.length - 1].weight
 
      this.change = this.weight - this.prevWeight 

      if (this.weight > this.prevWeight) {
        this.change = `+${this.change} kg`
      } 
      else if (this.weight < this.prevWeight) {
        this.change = `${this.change} kg`
      } else {
        this.change = `-`
      }
      
        await this.createRecord ({
          date: dateFilter(this.date),
          change: this.change,
          weight: this.weight
        })
        this.$toasted.show(
        'New record was added!', {
          icon: 'check'
        })
      }
    }
  }
}
</script>

<style scoped> 
#weight-value-input {
  background-color: #f6fafd;
  box-shadow: none;
}

.form-group {
  width: 600px;
}

.input-group .form-control {
  background-color: #f6fafd;
}

.input-group .form-control:focus {
  box-shadow: none;
}

.vdp-datepicker__calendar-button.input-group-prepend .input-group-text {
  background-color: #f6fafd;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    color 0.15s ease-in-out;
}

.vdp-datepicker__calendar-button.input-group-prepend .input-group-text:active {
  background-color: rgb(237, 232, 241);
  border-color: rgb(219, 205, 231);
}

.vdp-datepicker__calendar-button.input-group-prepend
  .input-group-text:active
  i {
  color: rgb(131, 131, 131);
}

.prev,
.next,
.vdp-datepicker__calendar .cell.selected {
  background: #b2a3d62e !important;
}

.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover {
  border-color: #a38cd82e !important;
}

.vdp-datepicker__clear-button.input-group-append .input-group-text {
  background-color: #f6fafd;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    color 0.15s ease-in-out;
}

.vdp-datepicker__clear-button.input-group-append .input-group-text:active {
  background-color: rgb(237, 232, 241);
  border-color: rgb(219, 205, 231);
}
/* s */
</style>