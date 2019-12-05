<template>
	<view class="page">
    <view class="content">
      <view class="tabs">
        <view v-for="(item, index) in commentType"
          :key="index" class="tabItem" @click="clickTabs(index)"
          :class="tabIndex==index?'active':''">{{item}}</view>
      </view>
      <scroll-view
        scroll-y :style="'height:' + scrollViewHeight + 'px'"
        @scrolltolower="getCommentByUser"
      >
        <loop-comment :comments="comments" :noMore="noMore" :isLoading="isLoading"></loop-comment>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>