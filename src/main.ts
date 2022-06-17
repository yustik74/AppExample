import Vue from 'vue';
import App from './App.vue';
import {ExternalSettings} from "@/scripts/Server";
import {ServiceConnector} from "@/scripts/ServiceConnector";
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.prototype.$settings = ExternalSettings;
Vue.prototype.$serviceConnector = new ServiceConnector(
    Vue.prototype.$settings.Urls.Service,
    Vue.prototype.$settings.Token,
    Vue.prototype.$settings.Name,
    Vue.prototype.$settings.Organization.UID);

Vue.prototype.$eventBus = new Vue();
import router from './router';

Vue.config.productionTip = false
Vue.use(Buefy, { defaultIconPack: 'fas' });

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
