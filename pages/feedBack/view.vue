<template>
	<view class="page">
    <view class="bottomButton borderTop">
      <view class="bbItem active">
        <view class="bbIcon"><i class="wjsp wjsp-pan_icon"></i></view>
        <view class="bbText">问题反馈</view>
      </view>
      <view class="bbItem">
        <view class="bbIcon"><i class="wjsp wjsp-liaotian2"></i></view>
        <view class="bbText">我的反馈</view>
      </view>
    </view>
    <view class="fbTop">
      <view class="fbtIcon"><i class="wjsp wjsp-sousuo"></i></view>
      <input type="text" placeholder-class="plaClass" placeholder="请输入遇到问题的关键词">
    </view>
    <view class="content">
      <view class="fbBtn btn btn-primary btn-radius btn-small">提交反馈</view>
      <view class="listBlockTitle">常见问题</view>
      <view class="wjList">
        <view class="wjListCell" v-for="(item, index) in 20" :key="index">
          <view class="wjListText">常见问题1</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>