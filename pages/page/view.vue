<template>
	<view class="page">
    <view class="content">
      <view class="singleContent">
        <view class="richBox">
          <rich-text :nodes="contentNodes"></rich-text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>