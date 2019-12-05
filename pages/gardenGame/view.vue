<template>
	<view class="page">
    <view class="content">
      <view class="ggMain">
        <view class="ggBg">
          <!-- <view class="ggTree1"><img src="http://www.wenjiangs.com/wp-content/uploads/gardenGame/tree1.png"/></view> -->
          <!-- <view class="ggTree2"><img src="http://www.wenjiangs.com/wp-content/uploads/gardenGame/tree2.png"/></view> -->
          <view class="ggTree3">
            <view class="ggTree3Tree"><img src="http://www.wenjiangs.com/wp-content/uploads/gardenGame/tree3.png"/></view>
            <!-- <view class="ggTree3Hua"><img src="http://www.wenjiangs.com/wp-content/uploads/gardenGame/hua.png"/></view> -->
            <view class="ggTree3Guo"><img src="http://www.wenjiangs.com/wp-content/uploads/gardenGame/guoshi.png"/></view>
          </view>
          <view class="progress">
            <view class="progressText">剩余：254:28</view>
            <view class="progressBar"></view>
          </view>
        </view>
      </view>
      <view class="titleBar">
        <view class="titleBarLeft">
          <img src="./img/arrow_left_white.png"/>
        </view>
      </view>
      <view class="ggTop">
        <view class="ggtUser">
          <img :src="userInfo.user_avatar">
          <text>{{userInfo.display_name}}</text>
        </view>
        <view class="ggtUser ggtCoin">
          <img src="./img/star.png">
          <text>255</text>
        </view>
      </view>
      <view class="ggBottomBtn">
        <view class="ggbbItem" @click="ggbbClick(1)" :class="ggbbClickIndex==1?'active':''">
          <button open-type="share"></button>
          <img src="./img/zsbtn_icon_03.png"/>
        </view>
        <view class="ggbbItem" @click="ggbbClick(2)" :class="ggbbClickIndex==2?'active':''">
          <img src="./img/zsbtn_icon_05.png"/>
        </view>
        <view class="ggbbItem" @click="ggbbClick(3)" :class="ggbbClickIndex==3?'active':''">
          <img src="./img/zsbtn_icon_07.png"/>
        </view>
        <view class="ggbbItem" @click="ggbbClick(4)" :class="ggbbClickIndex==4?'active':''">
          <img src="./img/zsbtn_icon_09.png"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>

<style>
@import url("style.css");
</style>