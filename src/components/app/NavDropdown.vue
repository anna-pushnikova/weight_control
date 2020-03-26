<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      id="userDropdown"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      ref="dropdown"
    >
      <i class="fas fa-user fa-fw"></i>
    </a>
    <div 
      class="dropdown-menu dropdown-menu-right" 
      aria-labelledby="userDropdown"
      ref="dropdownContent"
    >
      <router-link 
        class="dropdown-item" 
        to="/profile"
      >
        Profile
      </router-link>
      <div class="dropdown-divider"></div>
      <a
        class="dropdown-item" 
        @click="$emit('logout')"
      >Logout</a>
    </div>
  </li>
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

<style>
@import '~tippy.js/dist/tippy.css';
@import '~tippy.js/themes/light-border.css';
@import '~tippy.js/animations/shift-away-subtle.css';
</style>