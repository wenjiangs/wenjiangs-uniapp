<template>
	<view class="page">
    <view class="content">
      <view class="gsTop">
        <view class="goodsBnnaer">
          <swiper class="goodsBnnaer" v-if="goodsBnnaer.length">
            <swiper-item v-for="(item, index) in goodsBnnaer" :key="index">
              <view class="swiper-item">
                <img :src="item">
              </view>
            </swiper-item>
          </swiper>
        </view>
        <view class="goodsPrices"><text>375</text>积分</view>
        <view class="goodsName">商品名称 运动公司东方红郡阿尔加工是款到发货运动公司东方红郡阿尔加工是款到发货</view>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>