<template>
  <div class="col-lg-7">
    <div class="card shadow-lg border-0 rounded-lg mt-5">
      <div class="card-header">
        <h3 class="text-center font-weight-light my-4">Create Account</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitHandler">
          <div class="form-row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="small mb-1" for="inputFirstName">First Name</label>
                <input
                  class="form-control py-4"
                  id="inputFirstName"
                  type="text"
                  placeholder="Enter first name"
                  v-model="firstName"
                  :class="{ 
                    'is-invalid': ($v.firstName.$dirty && !$v.firstName.required),
                    'is-valid': ($v.firstName.$dirty && $v.firstName.required) 
                  }"/>
                <div 
                  class="invalid-feedback"
                  v-if="$v.firstName.$dirty && !$v.firstName.required">
                  Enter first name.
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="small mb-1" for="inputLastName">Last Name</label>
                <input
                  class="form-control py-4"
                  id="inputLastName"
                  type="text"
                  placeholder="Enter last name"
                  v-model="lastName"
                  :class="{ 
                    'is-invalid': ($v.lastName.$dirty && !$v.lastName.required),
                    'is-valid': ($v.lastName.$dirty && $v.lastName.required) 
                  }"/>
                <div 
                  class="invalid-feedback"
                  v-if="$v.lastName.$dirty && !$v.lastName.required">
                  Enter last name.
                </div>
              </div>
            </div>
          </div>
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
              }"/>
            <div 
              class="invalid-feedback"
              v-if="(($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email))">
              Enter the email.
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="small mb-1" for="inputPassword">Password</label>
                <input
                  class="form-control py-4"
                  id="inputPassword"
                  type="password"
                  placeholder="Enter password"
                  v-model="password"
                  :class="{ 
                    'is-invalid': (($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)),
                    'is-valid': (($v.password.$dirty && $v.password.required) || ($v.password.$dirty && $v.password.minLength))
                  }"/>
                <div 
                  class="invalid-feedback"
                  v-if="$v.password.$dirty && !$v.password.minLength"
                >
                  Password must contain at least {{$v.password.$params.minLength.min}} symbols.
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="small mb-1" for="inputConfirmPassword">Confirm Password</label>
                <input
                  class="form-control py-4"
                  id="inputConfirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  v-model="confirmPassword"
                  :class="{ 
                    'is-invalid': (($v.confirmPassword.$dirty && !$v.confirmPassword.sameAsPassword) || ($v.confirmPassword.$dirty && !$v.confirmPassword.required)),
                    'is-valid': (($v.confirmPassword.$dirty && $v.confirmPassword.sameAsPassword) || ($v.confirmPassword.$dirty && $v.confirmPassword.required))
                  }"/>
                <div
                  class="invalid-feedback"
                  v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.sameAsPassword">
                  Passwords do not match.
                </div>
              </div>
            </div>
          </div>
          <div class="form-group mt-4 mb-0">
            <button class="btn btn-primary btn-block" type="submit">Create Account</button>
          </div>
        </form>
      </div>
      <div class="card-footer text-center">
        <div class="small">
          <router-link to="/login">Have an account? Go to login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators/'

export default {
  data: () => ({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  }),
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)},
    firstName: {required},
    lastName: {required},
    confirmPassword: {sameAsPassword: sameAs('password')}
  },
  methods: {
    async submitHandler() {
      //Validate Forms
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      
      // Form data to send
      const credentials = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      } 
      // Send data
      try {
        await this.$store.dispatch('register', credentials) 
        this.$router.push('/')
        this.$toasted.show(
        'You were registered!', {
          icon: 'check'
        })
      } catch(e) {
        let errorCode = e.code
        let errorMessage = e.message

        if (errorCode === 'auth/email-already-in-use') {
          this.$toasted.show (
            errorMessage, {
            icon: 'exclamation-triangle'
          })
        }
      }
    }
  }
};
</script>

<style>
</style>