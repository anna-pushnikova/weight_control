<template>
  <div class="sb-nav-fixed"
  :class="{ 'sb-sidenav-toggled': !isOpen }">
    <Sidebar/>
    <Navbar
      v-model="isOpen"
      @click="isOpen = !isOpen"
    />
    <div id="layoutSidenav_content" style="display: block;">
      <main>
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-6">
              <div class="card mb-4">
                <div class="card-header">
                  <i class="fas fa-chart-area mr-1"></i>Area Chart Example
                </div>
                <div class="card-body">
                  <canvas id="myAreaChart" width="100%" height="40"></canvas>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="card mb-4">
                <div class="card-header">
                  <i class="fas fa-chart-bar mr-1"></i>Bar Chart Example
                </div>
                <div class="card-body">
                  <canvas id="myBarChart" width="100%" height="40"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';

export default {
  name: 'mainLayout',
  data: () => ({
    isOpen: true
  }),
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style>
@import '../../public/styles.css';

#layoutSidenav {
  display: flex;
}
#layoutSidenav #layoutSidenav_nav {
  flex-basis: 225px;
  flex-shrink: 0;
  transition: transform 0.15s ease-in-out;
  z-index: 1038;
  transform: translateX(-225px);
}
#layoutSidenav #layoutSidenav_content {
  position: relative !important;
  display: flex  !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  min-width: 0 !important;
  flex-grow: 1 !important;
  min-height: calc(100vh - 56px) !important;
  margin-left: -225px !important;
}

.sb-sidenav-toggled #layoutSidenav #layoutSidenav_nav {
  transform: translateX(0) !important;
}
.sb-sidenav-toggled #layoutSidenav #layoutSidenav_content:before {
  content: "" !important;
  display: block !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: #000 !important;
  z-index: 1037 !important;
  opacity: 0.5 !important;
  transition: opacity 0.3s ease-in-out !important;
}

  #layoutSidenav #layoutSidenav_nav {
    transform: translateX(0) !important;
  }
  #layoutSidenav #layoutSidenav_content {
    margin-left: 0 !important;
    transition: margin 0.15s ease-in-out !important;
  }

  .sb-sidenav-toggled #layoutSidenav #layoutSidenav_nav {
    transform: translateX(-225px) !important;
  }
  .sb-sidenav-toggled #layoutSidenav #layoutSidenav_content {
    margin-left: -225px !important;
  }
  .sb-sidenav-toggled #layoutSidenav #layoutSidenav_content:before {
    display: none !important;
  }

.sb-nav-fixed .sb-topnav {
  z-index: 1039 !important;
}
.sb-nav-fixed #layoutSidenav #layoutSidenav_nav {
  width: 225px !important;
  height: 100vh !important;
  z-index: 1038 !important;
}
.sb-nav-fixed #layoutSidenav #layoutSidenav_nav .sb-sidenav {
  padding-top: 56px !important;
}
.sb-nav-fixed #layoutSidenav #layoutSidenav_nav .sb-sidenav .sb-sidenav-menu {
  overflow-y: auto !important;
}
.sb-nav-fixed #layoutSidenav #layoutSidenav_content {
  padding-left: 225px !important;
  top: 56px !important;
}

</style>