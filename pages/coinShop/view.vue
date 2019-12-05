<template>
	<view class="page noPageBorder">
    <view class="content">
      <view class="coinShopBannerBg">
        <view></view>
      </view>
      <view class="coinShopBanner">
        <img mode="" src="http://www.wenjiangs.com/wp-content/uploads/2019/11/gold_store_banner.jpg"/>
      </view>
      <view class="coinNav">
        <view class="coinNavItem" @click="wjRouterPush('userCoin')">
          <img src="static/img/coinNav_03.png"/>
          每日签到
        </view>
        <view class="coinNavItem" @click="wjRouterPush('userCoin')">
          <img src="static/img/coinNav_05.png"/>
          我的金币
        </view>
        <view class="coinNavItem" @click="wjRouterPush('userCollection')">
          <img src="static/img/coinNav_07.png"/>
          我的收藏
        </view>
        <view class="coinNavItem" @click="wjRouterPush('userCoinList')">
          <img src="static/img/coinNav_09.png"/>
          兑换记录
        </view>
      </view>
      <view class="wjMod">
        <view class="wjModTilte">
          <view class="wjModMore pull-right">更多 <i class="wjsp wjsp-right"></i></view>
          <view class="wjModTilteTxt">热门兑换</view>
        </view>
        <view class="coinShopHotList">
          <loop-goods></loop-goods>
        </view>
      </view>
      
      <view class="wjMod">
        <view class="wjModTilte">
          <view class="wjModMore pull-right">更多 <i class="wjsp wjsp-right"></i></view>
          <view class="wjModTilteTxt">猜你喜欢</view>
        </view>
        <view class="coinShopNormalList">
          <loop-goods-normal></loop-goods-normal>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>