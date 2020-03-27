<template>
  <div class="col-lg-5">
    <div class="card shadow-lg border-0 rounded-lg mt-5">
      <div class="card-header">
        <h3 class="text-center font-weight-light my-4">Login</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitHandler">
          <div class="form-group">
            <label class="small mb-1" for="inputEmailAddress">Email</label>
            <input
              class="form-control py-4"
              id="inputEmailAddress"
              type="text"
              placeholder="Enter email address"
              v-model="email"
              :class="{ 
                'is-invalid': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email),
                'is-valid': ($v.email.$dirty && $v.email.required) || ($v.email.$dirty && $v.email.email)
              }"
            />
            <div 
              class="invalid-feedback"
              v-if="(($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email))"
            >
              Enter the email.
            </div>
          </div>
          <div class="form-group">
            <label class="small mb-1" for="inputPassword">Password</label>
            <input
              class="form-control py-4"
              id="inputPassword"
              type="password"
              placeholder="Enter password"
              v-model="password"
              :class="{ 
                'is-invalid': $v.password.$dirty && !$v.password.required,
                'is-valid': $v.password.$dirty && $v.password.required
              }"
            />
            <div 
              class="invalid-feedback"
              v-if="$v.password.$dirty && !$v.password.required"
            >
              Enter the password.
            </div>
          </div>
          <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
            <router-link class="small" to="/password">Forgot Password?</router-link>
            <button class="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
      </div>
      <div class="card-footer text-center">
        <div class="small">
          <router-link to="/register">Need an account? Sign up!</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators/'

export default {
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { required, email },
    password: { required }
  },
  mounted() {
    if(this.$route.query.message === 'logout') {
      this.$toasted.show (
      'You logged out', {
        icon: 'check'
      })
    } 
  },
  methods: {
    async submitHandler() {
      // Validate Forms
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      // Form fata to send
      const formData = {
        email: this.email ,
        password: this.password
      }

      // Send Data
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
        this.$toasted.show(
        'You sucessfully logged in!', {
          icon: 'check'
        })
      } catch(e) {}
    }
  }
}
</script>

<style>

</style>