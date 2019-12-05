<template>
	<view class="page">
    <view class="content">
      <view class="tabs">
        <view class="tabItem" :class="tabIndex==0?'active':''" @click="clickTabs(0)">我的关注</view>
        <view class="tabItem" :class="tabIndex==1?'active':''" @click="clickTabs(1)">我的粉丝</view>
      </view>
      <scroll-view
        scroll-y="true"
        :style="'height:' + svHeight + 'px;'"
        @scrolltolower="getList"
      >
        <view class="msgList" v-if="dataList.length">
          <view class="msgItem" v-for="(item, index) in dataList"
            :key="index" @click="wjRouterPush({path:'author', query:{id: item.user_id}})">
            <view class="msgRightBtn pull-right">
              <view @click.stop="doCollection(item, index)" v-if="item.collection_user"
                class="btn btn-empty btn-small btn-danger btn-radius">已关注</view>
              <view @click.stop="doCollection(item, index)" v-else
                class="btn btn-small btn-danger btn-radius">关注</view>
            </view>
            <view class="msgImage pull-left">
              <image :src="item.user_avatar" />
              <view class="noReadBadge" v-if="item.noRead>0">{{item.noRead}}</view>
            </view>
            <view class="msgText">
              <view class="msgTitle">
              <view class="pull-right">{{item.send_time}}</view>
              {{item.display_name}}
              </view>
              <view class="msgSummary">{{item.description}}</view>
            </view>
          </view>
        </view>
        <view class="seatEmpty" v-if="dataList.length==0 && !isLoading">
          <view class="seatBox">
            <view class="seatIcon"></view>
            <view class="seatText">暂无内容</view>
          </view>
        </view>
        <uni-load-more v-if="dataList.length>0" :status="noMore?'noMore':'loading'"></uni-load-more>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>