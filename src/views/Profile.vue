<template>
  <div>
    <info/>
    <h2 class="pb-5 pt-4">Set Profile Info</h2>
    <form @submit.prevent="submitHandler()" class="profile-form">
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="weight-value-input">Enter your first name</label>
            <input
              type="text"
              class="form-control"
              id="weight-value-input"
              placeholder="Enter name"
              v-model="firstName"
            />
            <small v-if="$v.firstName.$dirty && !$v.firstName.required" class="form-text text-muted">
              Enter first name
            </small>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="weight-value-input">Enter your last name</label>
            <input
              type="text"
              class="form-control"
              id="weight-value-input"
              placeholder="Enter last name"
              v-model="lastName"
            />
            <small v-if="$v.lastName.$dirty && !$v.lastName.required" class="form-text text-muted">
              Enter last name
            </small>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="weight-value-input">Enter your age</label>
            <input
              type="number"
              class="form-control"
              id="weight-value-input"
              placeholder="Enter age"
              v-model.number="age"
              min="1"
              max="170"
            />
            <small v-if="$v.age.$dirty && !$v.age.required" class="form-text text-muted">
              Enter age
            </small>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="inputGroupSelect02">Select your sex</label>
            <select 
              class="custom-select"
              id="inputGroupSelect02"
              v-model="sex"
            >
              <option selected>Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <small v-if="$v.sex.$dirty && !$v.sex.required" class="form-text text-muted">
            Choose sex
            </small>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="weight-value-input">Enter your height</label>
            <input
              type="number"
              class="form-control"
              id="weight-value-input"
              placeholder="Enter height"
              v-model.number="height"
              min="50"
              max="275"
            />
            <small v-if="$v.height.$dirty && !$v.height.required" class="form-text text-muted">
              Enter height
            </small>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="weight-value-input">Enter your weight goal</label>
            <input
              type="number"
              class="form-control"
              id="weight-value-input"
              placeholder="Enter weight goal"
              v-model.number="goal"
              min="25"
              max="275"
            />
            <small v-if="$v.goal.$dirty && !$v.goal.required" class="form-text text-muted">
              Enter weight goal
            </small>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Confirm</button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators/'
import { mapActions } from 'vuex'
import info from '@/components/ProfileInfo.vue'

export default {
  name: 'profile',
  data: () => ({
    lastName: '',
    age: '',
    height: '',
    goal: '',
    sex: '',
    firstName: ''
  }),
  components: {
    info
  },
  validations: {
    firstName: { required },
    lastName: { required },
    age: { required },
    height: { required },
    goal: { required },
    sex: {required}
  },
  methods: {
    ...mapActions(['updateData']),
    async submitHandler() {
      //Validate forms 
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      // Form data to send 
      const toSet = {
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        height: this.height,
        goal: this.goal,
        sex: this.sex
      }

      // Update data
      try {
        await this.updateData({
          ...toSet
        })
        this.$toasted.show(
        'Profile information was updated!', {
          icon: 'check'
        })
      } catch(e) {}
    }
  }
}
</script>

<style scoped>
.profile-form {
  padding: 0 5px;
  padding-bottom: 50px;
}
</style>