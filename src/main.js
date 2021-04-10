import Vue from "vue";

import router from "./router";

Vue.config.productionTip = false;
import { NavBar } from "./components";
import "bootstrap/dist/css/bootstrap.css";

new Vue({
  router,
  components: {
    "nav-bar": NavBar,
  },
}).$mount("#app");

// new Vue({
//   render: (h) => h(App),
//   router,
// }).$mount("#app");
