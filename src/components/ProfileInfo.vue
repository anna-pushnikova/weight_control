<template>
  <div class="row">
    <div class="col-xl-12">
      <table class="table table-hover mt-2">
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