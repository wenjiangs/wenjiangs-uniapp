<template>
	<view class="page">
    <view class="content">
      <scroll-view
        scroll-y="true"
        :style="'height:' + svHeight + 'px;'"
        @scrolltolower="loadData"
      >
      <loop-topic :topics="dataList" :userID="userInfo.ID"></loop-topic>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>