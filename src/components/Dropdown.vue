<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn dropdown-toggle"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @click="isOpen = !isOpen"
    >Edit last record</button>
    <div 
      class="dropdown-menu" 
      :class="{ 'show': isOpen }"
    >
      <router-link 
        class="dropdown-item" 
        to="/edit_record"
      >
        Edit
      </router-link>
      <a
        class="dropdown-item" 
        @click.prevent="$emit('click')"
      >
        Delete
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: "dropdown",
  data: () => ({
    isOpen: false
  })
};
</script>

<style>


a.dropdown-item {
  cursor: pointer;
}

.btn.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem #cfc8de;
  border-color: #c1b3df;
}


</style>