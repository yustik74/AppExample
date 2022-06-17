<template>
  <div id="app">
    <div class="container">
      <b-navbar :fixed-top="true" :centered="true">
        <template #start>
          <b-navbar-item href="#">
            <router-link to="/">
              <b-icon
                  pack="fas"
                  icon="home"
                  size="is-small">
              </b-icon>
              &nbsp; Главная
            </router-link>
          </b-navbar-item>
          <b-navbar-item href="#">
            <router-link to="/enumschemas">
              <b-icon
                  pack="fas"
                  icon="sitemap"
                  size="is-small">
              </b-icon>
              &nbsp; Организации
            </router-link>
          </b-navbar-item>
          <b-navbar-item href="#">
            <router-link to="/enumdevices">
              <b-icon
                  pack="fas"
                  icon="car"
                  size="is-small">
              </b-icon>
              &nbsp; Объекты мониторинга
            </router-link>
          </b-navbar-item>
          <b-navbar-item href="#">
            <router-link to="/about">
              <b-icon
                  pack="fas"
                  icon="info-circle"
                  size="is-small">
              </b-icon>
              &nbsp; О плагине
            </router-link>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class App extends Vue {
  progress = false;

  created(): void {
    //
  }
}

</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    /*    font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
          color: #167df0;
        }*/
  }
}
</style>
