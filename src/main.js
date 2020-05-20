import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
registerGlobalAsyncComponents();

async function registerGlobalAsyncComponents() {
  const files = require
    .context("@/components", false, /\.vue$/i, "lazy")
    .keys(); // works
  // const files = require.context(folderPath, true, /\.vue$/i, "lazy").keys(); // not work. https://stackoverflow.com/questions/45327765/pass-a-variable-to-require-context?
  for (const file of files) {
    const fileName = file
      .split("/")
      .pop()
      .split(".")[0];
    Vue.component(fileName, () =>
      import(/* webpackChunkName: "[request]" */ `@/components/${fileName}`)
    );
  }
}

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
