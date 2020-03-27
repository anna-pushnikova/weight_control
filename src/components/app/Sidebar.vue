<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Statistics</div>

          <router-link
            tag="a"
            :to="link.url"
            class="nav-link"
            v-for="link in links"
            :key="link.url"
            active-class="active"
            :exact="link.exact"
            >
            <div class="sb-nav-link-icon">
              <i :class="link.icon_class"></i>
            </div>
           {{link.title}}
          </router-link>

          
        </div>
      </div>
      <div class="sb-sidenav-footer">
        <div class="small">Logged in as: {{loggedInUser}}</div>Weight Control
      </div> 
    </nav>
  </div>
</template>

<script>
export default {
  data:() => ({
    links: [
      {title: 'Overview', url: '/', icon_class: 'fas fa-tachometer-alt', exact: true},
      {title: 'Statistics', url: '/statistics', icon_class: 'fas fa-chart-bar'},
      {title: 'Overall', url: '/overall', icon_class: 'fas fa-chart-area'},
      {title: 'History', url: '/history', icon_class: 'fas fa-history'},
      {title: 'New Record', url: '/new_record', icon_class: 'fas fa-plus-circle'}
    ]
  }),
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    firstName() {
      return `${this.info.firstName}`
    },
    lastName() {
      return `${this.info.lastName}`
    },
    loggedInUser() {
      return `${this.firstName} ${this.lastName}`
    }
    
  }
};
</script>

<style>

.sb-sidenav-footer .small{
  color: #fff;
}

.sb-sidenav-footer .small:hover{
  color: rgb(248, 232, 255);
}

</style>
