import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { api } from "./services/api";
import axios from "axios";
import { VueQueryPlugin } from "vue-query";
// inject global axios instance as http client to Model

// axios.defaults.withCredentials = true;
// axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers.common["Accept"] = "application/json";
// createApp(App).use(router).use(VueQueryPlugin).mount("#app");
createApp(App).use(router).mount("#app");
