<template>
	<view class="page">
    <view class="content">
      <view class="sPageTop">
        <view class="searchForm">
          <input type="text" @confirm="confirmSearch" confirm-type="search" name="wjSearch"
            :focus="true" class="searchTxt" placeholder="搜索关键词" v-model="sVal"/>
        </view>
        <view class="sweep pageSweep" @click="wjRouterGo(1)">取消</view>
      </view>
      <scroll-view
        scroll-y="true"
        :style="'height:' + svHeight + 'px;'"
        @scrolltolower="getSearch"
      >
      <loop-post :posts="dataList"></loop-post>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>