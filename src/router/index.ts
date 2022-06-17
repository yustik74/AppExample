import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import {ExternalSettings} from "@/scripts/Server";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: require( '../views/Home.vue').default
  },
  {
    path: '/enumschemas',
    name: 'Schemas',
    component: require( '../views/EnumSchemas.vue').default
  },
  {
    path: '/enumdevices',
    name: 'Devices',
    component: require( '../views/EnumDevices.vue').default
  },
  {
    path: '/about',
    name: 'About',
    component: require( '../views/About.vue').default
  }
]

const router = new VueRouter({
  mode: 'history',
  base: ExternalSettings.Urls.Content,
  routes
})

export default router
