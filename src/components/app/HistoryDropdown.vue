<template>
  <div class="nav-item dropdown">
    <button
      type="button"
      class="btn dropdown-toggle"
      ref="dropdown"
    >
      Edit last record
    </button>
    <div 
      class="dropdown-content"
      ref="dropdownContent"
    >
      <router-link 
        class="dropdown-item" 
        to="/edit_record"
      >
        Edit
      </router-link>
      <div class="dropdown-divider"></div>
      <a
        class="dropdown-item" 
        @click="$emit('delete')"
      >Delete</a>
    </div>
  </div>
</template>

<script>
import tippy from 'tippy.js'
export default {
  mounted() {
    tippy (this.$refs.dropdown, {
      content: this.$refs.dropdownContent,
      interactive: true,
      theme: 'light-border',
      animation: 'shift-away-subtle',
      placement: 'bottom',
      arrow: true,
      inertia: true,
      trigger: 'click',
      allowHTML: true
    })
  },
}
</script>

<style lang="scss">
@import '~tippy.js/dist/tippy.css';
@import '~tippy.js/themes/light-border.css';
@import '~tippy.js/animations/shift-away-subtle.css';

.dropdown-item {
  cursor: pointer;
}
.dropdown-content {
  min-width: 150px;
  min-height: 75px;
}

</style>