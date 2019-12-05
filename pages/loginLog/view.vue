<template>
  <view class="page">
    <view class="content">
      <view class="loginLogList">
        <view class="llItem llItemHead">
          <view class="lliTime">登录时间</view>
          <view class="lliIp">IP地址</view>
          <view class="lliOs">客户端</view>
        </view>
      </view>
      <scroll-view v-if="dataList.length" scroll-y="true" :style="'height:'+svHeight+'px'" @scrolltolower="loadData">
      <view class="loginLogList">
        <view class="llItem" v-for="(item, index) in dataList" :key="index">
          <view class="lliTime">{{item.log_time}}</view>
          <view class="lliIp">{{item.ip}}</view>
          <view class="lliOs">{{item.os}}</view>
        </view>
      </view>
      <uni-load-more v-if="dataList.length>0" :status="noMore?'noMore':'loading'"></uni-load-more>
      </scroll-view>
      <view class="seatEmpty" v-if="dataList.length==0 && !isLoading">
        <view class="seatBox">
          <view class="seatIcon"></view>
          <view class="seatText">暂无数据！</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import control from './control.js';
  export default control;
</script>
