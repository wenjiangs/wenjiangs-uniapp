<template>
	<view class="page">
    <view class="content">
      <view class="wjList">
        <view class="wjListCell wjListCellNoRight">
          <view class="wjListText stAvatar">
            <view class="wjListTA">
              <img :src="author.user_avatar" mode="aspectFill"/>
            </view>
            头像
          </view>
        </view>
        <view class="wjListCell wjListCellNoRight">
          <view class="wjListText">
            <view class="wjListTN">{{author.display_name}}</view>
            昵称
          </view>
        </view>
        <view class="wjListCell wjListCellNoRight">
          <view class="wjListText">
            <view class="wjListTN">{{author.location}}</view>
            地址
          </view>
        </view>
        <view class="wjListCell wjListCellNoRight mulText">
          <view class="wjListText">
            <view class="wjListTN">{{author.location2}}</view>
            详细地址
          </view>
        </view>
        <view class="wjListCell wjListCellNoRight">
          <view class="wjListText">
            <view class="wjListTN">{{author.gender}}</view>
            性别
          </view>
        </view>
        <view class="wjListCell wjListCellNoRight mulText">
          <view class="wjListText">
            <view class="wjListTN">{{author.description}}</view>
            个性说明
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>