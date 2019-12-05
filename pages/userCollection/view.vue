<template>
	<view class="page">
    <view class="content">
      <view class="tabs">
        <view class="tabItem" :class="dataType==1?'active':''" @click="tabClick(1)">文章</view>
        <view class="tabItem" :class="dataType==2?'active':''" @click="tabClick(2)">评论</view>
        <view class="tabItem" :class="dataType==3?'active':''" @click="tabClick(3)">专辑</view>
        <view class="tabItem" :class="dataType==4?'active':''" @click="tabClick(4)">话题</view>
        <view class="tabItem" :class="dataType==5?'active':''" @click="tabClick(5)">回复</view>
      </view>
      <scroll-view
        scroll-y :style="'height:' + scrollViewHeight + 'px'"
        @scrolltolower="getCollection"
      >
        <loop-post v-if="dataType==1" :posts="dataList"
          :noMore="noMore" :isLoading="isLoading"></loop-post>
        <loop-comment v-if="dataType==2" :comments="dataList"
          :noMore="noMore" :isLoading="isLoading"></loop-comment>
        <loop-category v-if="dataType==3" :docs="dataList"
          :noMore="noMore" :isLoading="isLoading"></loop-category>
        <loop-topic v-if="dataType==4" :topics="dataList"
          :noMore="noMore" :isLoading="isLoading"></loop-topic>
        <loop-comment v-if="dataType==5" :comments="dataList"
          :noMore="noMore" :isLoading="isLoading"></loop-comment>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>