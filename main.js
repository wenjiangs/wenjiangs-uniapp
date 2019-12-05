import Vue from 'vue'
import App from './App'

import methods from './methods'
import config from './config'
// #ifdef H5
import jWeixin from 'jweixin-module';
// #endif

import store from './store'

// 组件
import uniLoadMore from "@/components/uni-load-more.vue"
Vue.component('uni-load-more', uniLoadMore);

import loopPost from '@/components/loop-post.vue'
Vue.component('loop-post', loopPost);

import loopTopic from '@/components/loop-topic.vue'
Vue.component('loop-topic', loopTopic);

import loopComment from '@/components/loop-comment.vue'
Vue.component('loop-comment', loopComment);

import loopCategory from '@/components/loop-category.vue'
Vue.component('loop-category', loopCategory);

import uploadImg from '@/components/upload-img.vue'
Vue.component('upload-img', uploadImg);

import loopGoods from '@/components/loop-goods.vue'
Vue.component('loop-goods', loopGoods);

import loopGoodsNormal from '@/components/loop-goods-normal.vue'
Vue.component('loop-goods-normal', loopGoodsNormal);

Vue.config.productionTip = false

App.mpType = 'app'

// 附加方法到 Vue 原型上
for (let key in methods) {
  Vue.prototype[key] = methods[key];
}

// 附加方法到 Vue 原型上
for (let key in config) {
  Vue.prototype[key] = config[key];
}

// #ifdef H5
// 微信开发jssdk
Vue.prototype['jweixin'] = jWeixin;
// #endif

Vue.prototype.$store = store

const app = new Vue({
  ...App,
  store
})
app.$mount()
