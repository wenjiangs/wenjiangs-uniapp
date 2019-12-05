<template>
	<view class="page">
    <view class="content">
      <view class="sclIcon"><i class="wjsp wjsp-computer"></i></view>
      <view class="sclInfo">
        <view>即将使用 <i>{{userInfo.display_name}}</i> 登录文江博客网页版</view>
        <view>请确认是你本人操作</view>
      </view>
      <view class="sclBtn">
        <view class="btn btn-primary" @click="doLogin">确认登录</view>
        <view class="btn" @click="doCancel">取消</view>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>