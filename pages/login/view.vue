<template>
	<view class="page">
    <view class="content">
      <view class="formWrap lrFormWrap">
        <view class="lrFormWrapBox">
          <view class="lrLogo">
            <img src="http://www.wenjiangs.com/wp-content/themes/wtheme/images/logo_avatar.jpg"/>
          </view>
          <view class="lrlInfo formItem formItemAgreement">
            登录注册即表示同意 <view @click="wjRouterPush('about')">用户协议和使用规范</view></view>
          <view class="formItem">
            <input type="text" class="formControl" v-model="user_login" placeholder="用户名/邮箱地址/手机号"/>
          </view>
          <view class="formItem">
            <input type="password" class="formControl" v-model="user_pass" placeholder="登录密码"/>
          </view>
          <view class="formItem formItemAgreement">
            <view class="pull-right" @click="wjRouterPush('register')">注册账号</view>
            <view class="pull-left" @click="wjRouterPush('forgetMe')">忘记密码？</view>
          </view>
          <view class="formItem formItemBtn">
            <view @click="checkForm" class="btn btn-primary">登录</view>
          </view>
          <view class="regOtherText">社交账号登录</view>
          <view class="regOther">
            <!-- #ifdef MP-WEIXIN -->
            <view>
              <button open-type="getUserInfo" data-type="wxsp" @getuserinfo="bindGetUserInfo"></button>
              <i class="wjsp wjsp-weixin"></i>
            </view>
            <!-- #endif -->
            <!-- #ifdef MP-QQ -->
            <view>
              <button open-type="getUserInfo" data-type="qqsp" @getuserinfo="bindGetUserInfo"></button>
              <i class="wjsp wjsp-qq"></i>
            </view>
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <view><i class="wjsp wjsp-qq"></i></view>
            <view><i class="wjsp wjsp-weibo"></i></view>
            <!-- #endif -->
            <!-- #ifdef APP-PLUS -->
            <view><i class="wjsp wjsp-qq" @click="getAuthLogin('qq')"></i></view>
            <view><i class="wjsp wjsp-weibo" @click="getAuthLogin('sinaweibo')"></i></view>
            <!-- #endif -->
            <!-- #ifdef MP-ALIPAY -->
            <view>
              <button open-type="getAuthorize"
                @getAuthorize="alipayGetUserInfo"
                @error="onAuthError" scope="userInfo"></button>
              <i class="wjsp wjsp-zhifubao"></i>
            </view>
            <!-- #endif -->
            <!-- #ifdef MP-BAIDU -->
            <view><i class="wjsp wjsp-icon_baidulogo"></i></view>
            <!-- #endif -->
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