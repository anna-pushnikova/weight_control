<template>
  <div class="card">
    <h5 class="card-header">{{item.datetime | datetimefilter}}</h5>
    <div class="card-body">
      <table class="table table-hover">
        <tbody>
          <tr>
            <td>{{monthDateText}}</td>
            <td>{{monthChangeText}}</td>
            <td>{{monthWeightText}}</td>
          </tr>
          <tr
            v-for="(item, key) in item.items"
            :key="key">
            <td>{{item.date | datefilter}}</td>
            <td>{{item.change | weightfilter}}</td>
            <td>{{item.weight + ' kg'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    monthDateText: 'Date',
    monthChangeText: 'Change',
    monthWeightText: 'Weight'
  })

}
</script>

<style lang="scss">
.card {
  margin-bottom: 50px;
  margin-top: 5px;
}
</style>