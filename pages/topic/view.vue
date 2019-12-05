<template>
	<view class="page">
    <view class="content">
      <view class="tabs">
        <view class="tabItem active" @click="wjRouterPush('topic')">话题</view>
        <view class="tabItem" @click="wjRouterPush('topicGroup')">小组</view>
      </view>
      <scroll-view
        scroll-y="true"
        :style="'height:' + svHeight + 'px;'"
        @scrolltolower="loadData"
      >
      <loop-topic :topics="dataList" :isLoading="isLoading" :userID="userInfo.ID"
        @doCollection="doCollection"
      ></loop-topic>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>