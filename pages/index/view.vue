<template>
  <view class="content staticPage">
    <scroll-view scroll-y="true" :style="'height:' + svHeight + 'px;'" @scrolltolower="loadData" @scroll="onPageScrollS">
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
      <view class="banner" :style="'margin-top:'+ttHeight+'px;width:'+bannerW+'px;height:'+bannerH+'px;'">
        <swiper class="mySwiper" :indicator-dots="bannerSwiperOpt.indicatorDots" :autoplay="bannerSwiperOpt.autoplay"
          :interval="bannerSwiperOpt.interval" :duration="bannerSwiperOpt.duration" :circular="bannerSwiperOpt.circular"
          v-if="banner.length" :style="'width:' + bannerW + 'px; height:'+ bannerH +'px;'">
          <swiper-item v-for="(item, index) in banner" :key="index">
            <view class="swiper-item">
              <img :src="item.image" :style="'width:' + bannerW + 'px; height:'+ bannerH +'px;'">
            </view>
          </swiper-item>
        </swiper>
      </view>
      
      <!-- #ifdef H5 || APP-PLUS -->
      <!-- 我的金币 -->
      <view class="indexCoin" v-if="!isEmpty(userInfo)">
        <view @click="wjRouterPush('userCoin')" class="pull-right btn btn-primary btn-radius btn-small">赚金币</view>
        <view class="icText">我的金币 <text @click="wjRouterPush('userCoinList')">{{userInfo.user_coin}} <i class="wjsp wjsp-right"></i></text></view>
      </view>
      <!-- #endif -->

      <!-- 推荐专栏 -->
      <view class="wjMod">
        <view class="wjModTilte">
          <view class="wjModMore pull-right" @click="wjRouterSwitchTab('docs')">更多 <i class="wjsp wjsp-right"></i></view>
          <view class="wjModTilteTxt">最新专栏</view>
        </view>
        <view class="indexDocsList">
          <swiper class="indexDocsSwiper" next-margin="30px" v-if="indexDocs.length" display-multiple-items="4">
            <swiper-item v-for="(item, index) in indexDocs" :key="index">
              <view class="swiper-item" @click="wjRouterPush({path: 'docsSingle', query: {id: item.term_id}})">
                <img :src="item.cover">
                <view class="idlText">{{item.name}}</view>
              </view>
            </swiper-item>
          </swiper>
        </view>
      </view>

      <view class="tabBox">
        <view class="tabs isFullpage" :style="'top:'+ttHeight+'px'" :class="sTop>tabTop?'tabFixed':''" id="tabAffix">
          <view class="tabItem" :class="catIndexID==item.term_id?'active':''" v-for="(item, index) in category" :key="index"
            @click="clickTabs(item.term_id)">{{item.name}}</view>
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
