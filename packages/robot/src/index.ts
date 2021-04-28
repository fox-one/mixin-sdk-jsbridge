///<reference types='webpack-env' />
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import routes from './routes';
import './reset.less';

const app = createApp(App);

app.use(routes);

app.use(ElementPlus);

app.mount('#root');

if (module.hot) {
  module.hot.accept();
}

