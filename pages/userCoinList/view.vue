<template>
  <view class="page">
    <view class="content">
      <scroll-view scroll-y="true"
        :style="'height:' + svHeight + 'px;'"
        @scrolltolower="loadData">
        <view class="ucList">
          <view class="ucListItem" v-for="(item, index) in dataList" :key="index">
            <view class="uclVal pull-right" :class="item.integral_value>0?'active':''">{{item.integral_value}}</view>
            <view class="uclTit">{{item.integral_remarks}}</view>
            <view class="uclDate">{{item.integral_date}}</view>
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
