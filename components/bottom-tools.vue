<template>
	<view class="bottomTools">
		<view class="btItem">
      <view>
        <view class="btIcon"></view>
        <view class="btText">首页</view>
      </view>
    </view>
		<view class="btItem">
      <view>
        <view class="btIcon"></view>
        <view class="btText">话题</view>
      </view>
    </view>
		<view class="btItem">
      <view>
        <view class="btIcon"></view>
        <view class="btText">专栏</view>
      </view>
    </view>
		<view class="btItem">
      <view>
        <view class="btIcon"></view>
        <view class="btText">我的</view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.bottomTools{
  height: 120upx;
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.btItem{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
