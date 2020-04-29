<template>
  <div class="row">
    <div class="col-xl-12">
      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-id-card mr-2"></i>Info
        </div>
        <div class="card-body">
          <table class="table table-hover">
            <tbody>
              <tr>
                <td scope="row">First Name:</td>
                <td scope="row">{{getFirstName}}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{{getLastName}}</td>
              </tr>
              <tr>
                <td scope="col">Age:</td>
                <td scope="col">{{getAge}}</td>
              </tr>
              <tr>
                <td>Sex:</td>
                <td>{{getSex}}</td>
              </tr>
              <tr>
                <td scope="col">Height:</td>
                <td scope="col">{{getHeight}}</td>
              </tr>
              <tr>
                <td scope="col">Weight Goal:</td>
                <td scope="col">{{getGoal}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>

export default {
  name: 'info',
  computed: {
    getFirstName() {
      return this.$store.getters.info.firstName 
    },
    getLastName() {
      return this.$store.getters.info.lastName
    },
    getAge() {
      return this.$store.getters.info.age
    },
    getSex() {
      return this.$store.getters.info.sex 
    },
    getHeight() {
      return this.$store.getters.info.height 
    },
    getGoal() {
      return this.$store.getters.info.goal 
    }
  }
}
</script>

<style scoped>
.card-header {
  text-align: center;
}
</style>