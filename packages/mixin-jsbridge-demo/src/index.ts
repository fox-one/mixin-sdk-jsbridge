///<reference types='webpack-env' />
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createApp } from 'vue';
import App from './App.vue';
import routes from './routes';
import styles from './index.less';
import './reset.less';

createApp(App).use(routes).mount('#root');


if (module.hot) {
  module.hot.accept();
}

