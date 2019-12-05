<template>
	<view class="page">
    <view class="bottomButton">
      <button class="btn btn-primary" @click="checkForm">提交</button>
    </view>
    <view class="content">
      <view class="listBlockTitle">举报对象</view>
      <view class="repUser">
        <view class="repuImage">
          <img :src="user.user_avatar"/>
        </view>
        <view class="repuName">{{user.display_name}}</view>
      </view>
      <view class="listBlockTitle">举报类型</view>
      <picker mode="selector" :value="repObjectIndex" :range="repObjectData" @change="repObjectChange">
      <view class="wjList">
        <view class="wjListCell">
          <view class="wjListText">{{repObjectVal==''?'请选择':repObjectVal}}</view>
        </view>
      </view>
      </picker>
      <view class="listBlockTitle">举报内容（选填）</view>
      <view class="reportTxt">
        <textarea
          placeholder="请输入你要举报的内容"
          placeholder-class="plaClass"
          v-model="repContent"
        ></textarea>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>