<template>
	<view class="page">
    <view class="content">
      <view class="scanResultContent">
        <view class="wjModTilteTxt">二维码内容：</view>
        <div class="wjContent">{{scanData}}</div>
        <view class="btn btn-primary" @click="setClipboard">复制到剪切板</view>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>