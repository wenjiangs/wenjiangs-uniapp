<template>
	<view class="page">
    <view class="bottomButton">
      <button class="btn btn-danger" @click="beforeLogout">退出登录</button>
    </view>
    <view class="content">
      <div class="listBlockTitle"><i @click="wjRouterPush('baseInfoEdit')">编辑</i>基本信息</div>
      <view class="wjList settingList">
        <view class="wjListCell wjListCellNoRight">
          <view class="wjListText stAvatar">
            <view class="wjListTA">
              <img :src="userInfo.user_avatar" mode="aspectFill"/>
            </view>
            头像
          </view>
        </view>
        <view class="wjListCell wjListCellNoRight">
          <view class="wjListText">
            <view class="wjListTN">{{userInfo.display_name}}</view>
            昵称
          </view>
        </view>
        <view class="wjListCell wjListCellNoRight">
          <view class="wjListText">
            <view class="wjListTN">{{userInfo.location}}</view>
            地址
          </view>
        </view>
        <view class="wjListCell wjListCellNoRight">
          <view class="wjListText">
            <view class="wjListTN">{{userInfo.gender}}</view>
            性别
          </view>
        </view>
        <view class="wjListCell wjListCellNoRight mulText">
          <view class="wjListText">
            <view class="wjListTN">{{userInfo.description}}</view>
            个性说明
            </view>
        </view>
        <view class="wjListCell wjListCellNoRight">
          <view class="wjListText">
            <view class="wjListTN">{{userInfo.user_registered}}</view>
            注册时间
          </view>
        </view>
      </view>
      <div class="listBlockTitle">安全设置</div>
      <view class="wjList settingList">
        <view class="wjListCell wjListCellNoRight">
          <view class="wjListText">
            <view class="wjListTN">{{userInfo.user_login}}</view>
            登录账号（不可修改）
          </view>
        </view>
        <view class="wjListCell" @click="wjRouterPush('passwordEdit')">
          <view class="wjListText">修改登录密码</view>
        </view>
        <view class="wjListCell" @click="wjRouterPush('phoneEdit')">
          <view class="wjListText">
            <view class="wjListTN">{{userInfo.mobile_phone}}</view>
            手机号
          </view>
        </view>
        <view class="wjListCell" @click="wjRouterPush('emailEdit')">
          <view class="wjListText">
            <view class="wjListTN">{{userInfo.user_email}}</view>
            邮箱
          </view>
        </view>
        <view class="wjListCell" @click="wjRouterPush('loginLog')">
          <view class="wjListText">登录日志</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>