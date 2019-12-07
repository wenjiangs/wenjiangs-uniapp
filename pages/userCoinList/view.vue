<template>
  <view class="page">
    <view class="content">
      <scroll-view :scroll-y="true">
        <view class="ucList">
          <view class="ucListItem">
            <view class="uclVal pull-right">+1</view>
            <view class="uclTit">每日签到</view>
            <view class="uclDate">2019-12-7 11:50:57</view>
          </view>
          <view class="ucListItem">
            <view class="uclVal pull-right active">+1</view>
            <view class="uclTit">每日签到</view>
            <view class="uclDate">2019-12-7 11:50:57</view>
          </view>
        </view>
        <uni-load-more :status="noMore?'noMore':'loading'"></uni-load-more>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import control from './control.js';
  export default control;
</script>
