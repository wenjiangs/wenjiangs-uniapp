<template>
	<view class="page">
    <view class="content">
      <view class="systemInfoTop">
        <view class="lrLogo">
          <img src="http://www.wenjiangs.com/wp-content/themes/wtheme/images/logo_avatar.jpg"/>
        </view>
        <view class="systemInfo">
          <view class="appName">文江博客</view>
          <view class="appVersion">当前版本：V {{systemInfo.version}}</view>
        </view>
      </view>
      <view class="wjList">
        <view class="wjListCell" @click="wjRouterPush({path:'page', query:{id:item.ID}})"
          v-for="(item, index) in pages" :key="index">
          <view class="wjListText">{{item.title}}</view>
        </view>
        <view class="wjListCell" @click="wjRouterPush('feedBack')">
          <view class="wjListText">服务与反馈</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>