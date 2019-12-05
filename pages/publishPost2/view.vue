<template>
	<view class="page">
    <view class="bottomButton">
      <view class="btn btn-primary">保存</view>
    </view>
    <view class="content">
      <view class="pubTit">
        <input placeholder="文章标题" placeholder-class="plaClass" />
      </view>
      <view class="pubText">
        <textarea
          placeholder="文章内容"
          placeholder-class="plaClass"
        ></textarea>
      </view>
      <view class="pubImage">
        <upload-img :count="9"></upload-img>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>