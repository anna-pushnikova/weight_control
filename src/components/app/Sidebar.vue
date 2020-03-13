<template>
  <div id="layoutSidenav">
    <div id="layoutSidenav_nav">
      <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
          <div class="nav">
            <div class="sb-sidenav-menu-heading">Home</div>
            <router-link class="nav-link" to="/">
              <div class="sb-nav-link-icon">
                <i class="fas fa-tachometer-alt"></i>
              </div>Overview
            </router-link>
            <div class="sb-sidenav-menu-heading">Statistics</div>

            <router-link
              class="nav-link collapsed"
              to="/bmi"
              data-toggle="collapse"
              data-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div class="sb-nav-link-icon">
                <i class="fas fa-chart-bar"></i>
              </div>BMI
              <div class="sb-sidenav-collapse-arrow">
                <i class="fas fa-angle-down"></i>
              </div>
            </router-link>

            <a
              class="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapsePages"
              aria-expanded="false"
              aria-controls="collapsePages"
            >
              <div class="sb-nav-link-icon">
                <i class="fas fa-chart-area"></i>
              </div>Overall
              <div class="sb-sidenav-collapse-arrow">
                <i class="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              class="collapse"
              id="collapsePages"
              aria-labelledby="headingTwo"
              data-parent="#sidenavAccordion"
            ></div>
            <div class="sb-sidenav-menu-heading"></div>
            <a class="nav-link" href="charts.html">
              <div class="sb-nav-link-icon">
                <i class="fas fa-history"></i>
              </div>History
            </a>
            <a class="nav-link" href="tables.html">
              <div class="sb-nav-link-icon">
                <i class="fas fa-plus-circle"></i>
              </div>New record
            </a>
          </div>
        </div>
        <div class="sb-sidenav-footer">
          <div class="small">Logged in as:</div>Weight Control
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
