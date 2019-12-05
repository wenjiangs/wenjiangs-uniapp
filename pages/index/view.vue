<template>
	<view class="content">
    <scroll-view
      scroll-y="true"
      :style="'height:' + svHeight + 'px;'"
      @scrolltolower="loadData"
      @scroll="onPageScrollS"
    >
      <!-- #ifndef MP-ALIPAY -->
      <view class="statusBar active" :style="'height:'+sbHeight+'px'"></view>
      <view class="homeTopTools2" :style="'top:'+(sbHeight-1)+'px;'">
        <view class="homeTopTools">
          <view class="searchForm" :style="'width:'+httWidth+'px;'">
            <view class="sweep sweepSearch" @click="wjRouterPush('search')"><i class="wjsp wjsp-sousuo"></i></view>
            <view class="sweep sweepScan" @click="doScan"><i class="wjsp wjsp-saomazhuanhuan"></i></view>
            <view class="sweep sweepMessage" @click="wjRouterPush('message')"><i class="wjsp wjsp-liaotian2"></i></view>
          </view>
        </view>
      </view>
      <!-- #endif -->
      <view class="banner"
        :style="'margin-top:'+ttHeight+'px;width:'+bannerW+'px;height:'+bannerH+'px;'">
        <swiper class="mySwiper" :indicator-dots="indicatorDots"
          :autoplay="autoplay" :interval="interval"
          :duration="duration"
          :circular="circular"
          v-if="banner.length"
          :style="'width:' + bannerW + 'px; height:'+ bannerH +'px;'"
        >
          <swiper-item v-for="(item, index) in banner" :key="index">
            <view class="swiper-item">
              <img :src="item.image" :style="'width:' + bannerW + 'px; height:'+ bannerH +'px;'">
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view class="tabBox">
        <view class="tabs isFullpage" :style="'top:'+ttHeight+'px'"
          :class="sTop>tabTop?'tabFixed':''" id="tabAffix">
          <view class="tabItem"
            :class="catIndexID==item.term_id?'active':''"
            v-for="(item, index) in category" :key="index"
            @click="clickTabs(item.term_id)"
          >{{item.name}}</view>
        </view>
      </view>
      <view class="homePostList">
      <loop-post :posts="dataList" :isLoading="isLoading" :noMore="noMore"></loop-post>
      </view>
    </scroll-view>
    <!-- <view class="fixedPub" @click="wjRouterPush('publishPost2')"><i class="wjsp wjsp-pan_icon"></i>发布</view> -->
  </view>
</template>
<script>
import control from './control.js';
export default control;
</script>