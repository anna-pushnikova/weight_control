<template>
  <div class="col-lg-5">
    <div class="card shadow-lg border-0 rounded-lg mt-5">
      <div class="card-header">
        <h3 class="text-center font-weight-light my-4">Password Recovery</h3>
      </div>
      <div class="card-body">
        <div
          class="small mb-3 text-muted"
        >
        Enter your email address and we will send you a link to reset your password.
        </div>
        <form @submit.prevent="submitHandler">
          <div class="form-group">
            <label class="small mb-1" for="inputEmailAddress">Email</label>
            <input
              class="form-control py-4"
              id="inputEmailAddress"
              type="text"
              aria-describedby="emailHelp"
              placeholder="Enter email address"
              v-model="email"
              :class="{ 
                'is-invalid': (($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)),
                'is-valid': (($v.email.$dirty && $v.email.required) || ($v.email.$dirty && $v.email.email))
              }"
            />
            <div 
              class="invalid-feedback"
              v-if="(($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email))"
            >
              Enter the email.
            </div>
          </div>
          <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
            <router-link class="small" to="/login">Return to login</router-link>
            <button class="btn btn-primary">Reset Password</button>
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
import { email, required } from 'vuelidate/lib/validators/'
export default {
  data: () => ({
    email: ''
  }),
  validations: {
    email: { required, email }
  },
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
    }
  }
};
</script>

<style>
</style>