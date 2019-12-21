<template>
	<view class="page">
    <view class="content">
      <view class="singleContent">
        <!-- #ifndef H5 -->
        <view class="richBox">
          <rich-text :nodes="contentNodes"></rich-text>
        </view>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <view class="wjContent" v-html="content"></view>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>