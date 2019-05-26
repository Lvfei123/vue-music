import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Row,Col,Button,Input,Table,TableColumn,Tabs,TabPane,Progress } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/index.css'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    error: require('./assets/loading.svg'),
    loading: require('./assets/loading.svg'),
    attempt: 1
  }
)


Vue.use(VueResource)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)   
Vue.use(Input) 
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Progress)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
