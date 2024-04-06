import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import FlexEnd from './components/FlexEnd/index.vue'
import SpaceBetween from './components/SpaceBetween/index.vue'

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .component('space-between', SpaceBetween)
  .component('flex-end', FlexEnd)
  .mount("#app");

