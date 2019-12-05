<template>
	<view class="page">
    <view class="content">
      <view class="tabs">
        <view v-for="(item, index) in postStatus"
          :key="index" class="tabItem" @click="clickTabs(index)"
          :class="tabIndex==index?'active':''">{{item.text}}</view>
      </view>
      <scroll-view
        scroll-y :style="'height:' + scrollViewHeight + 'px'"
        @scrolltolower="getPostsByUser"
      >
        <loop-post :posts="posts" :isLoading="isLoading" :noMore="noMore"></loop-post>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>