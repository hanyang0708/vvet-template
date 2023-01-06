import { createApp } from 'vue';
import pinia from '@/store';
import App from './App.vue';
import router from '@/router';
import '@/theme/index.less';
import SvgIcon from '@/plugins/SvgIcon.vue';
import 'virtual:svg-icons-register';


const app = createApp(App);
app.use(pinia)
    .use(router)
    .component('svg-icon', SvgIcon)
    .mount('#app');
