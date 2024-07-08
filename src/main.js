import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleCharts from "vue-google-charts";

const app = createApp(App);
app.use(router);
app.use(VueGoogleCharts);
app.mount("#app");
