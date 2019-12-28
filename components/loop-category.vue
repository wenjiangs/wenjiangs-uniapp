<template>
  <view>
    <view class="docsList" v-if="docs.length>0">
      <view class="docsItem" @click="toSingle(item)" v-for="(item, index) in docs" :key="index">
        <view class="diImage pull-left">
          <image style="height:160rpx; width:160rpx;" mode="aspectFill" :src="item.cover" />
        </view>
        <view class="diText">
          <view class="diTitle">{{item.name}}</view>
          <view class="diInfo">{{item.summary}}</view>
          <view class="diMeta">

            <view class="wjModel" v-if="type=='docs'">{{item.views}} 浏览</view>
            <view class="wjModel" v-if="type=='docs'">{{item.count}} 文档</view>
            <!-- #ifdef H5 || APP-PLUS -->
            <view class="wjModel" v-if="type=='docs'">{{item.comment_count}} 评论</view>
            <!-- #endif -->

            <view class="wjModel" v-if="type=='group'">{{item.count}} 主题</view>
            <view class="wjModel" v-if="type=='group'">{{item.comment_count}} 回复</view>

          </view>
        </view>
      </view>
    </view>
    <view class="seatEmpty" v-if="docs.length==0 && !isLoading">
      <view class="seatBox">
        <view class="seatIcon"></view>
        <view class="seatText">没有更多内容了</view>
      </view>
    </view>
    <uni-load-more v-if="docs.length>0" :status="noMore?'noMore':'loading'"></uni-load-more>
  </view>
</template>

<script>
  export default {
    props: {
      docs: {
        type: Array,
        default: () => {}
      },
      noMore: {
        type: Boolean,
        default: false,
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: '',
      },
    },
    data() {
      return {};
    },
    methods: {
      toSingle(item) {
        if (this.type == 'docs') {
          this.wjRouterPush({
            path: 'docsSingle',
            query: {
              id: item.term_id
            }
          })
        } else {
          this.wjRouterPush({
            path: 'topicGroupSingle',
            query: {
              id: item.term_id
            }
          })
        }
      }
    }
  }
</script>

<style>

</style>
