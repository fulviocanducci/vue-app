import Vue from "vue";
import App from "./components/App";

Vue.config.productionTip = false;

import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap-icons/font/fonts/bootstrap-icons.css";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
