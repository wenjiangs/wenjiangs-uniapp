<template>
	<view class="page">
    <view class="content">
      <scroll-view
        scroll-y="true"
        :style="'height:' + svHeight + 'px;'"
        @scrolltolower="loadData"
      >
      <loop-category type="docs" :docs="dataList" :isLoading="isLoading"></loop-category>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>