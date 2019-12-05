<template>
	<view class="page">
    <view class="bottomButton">
      <view @click="checkForm" class="btn btn-primary">注册账号</view>
    </view>
    <view class="content">
      <view class="formWrap lrFormWrap">
        <view class="lrFormWrapBox">
          <view class="lrlInfo formItem formItemAgreement">
            登录注册即表示同意 <view @click="wjRouterPush('about')">用户协议和使用规范</view></view>
          <view class="formItem">
            <input type="text" class="formControl" v-model="user_login" placeholder="用户名/手机号"/>
          </view>
          <view class="formItem">
            <input type="text" class="formControl" v-model="user_email" placeholder="邮箱地址"/>
          </view>
          <view class="formItem">
            <input type="password" class="formControl" v-model="user_password" placeholder="登录密码"/>
          </view>
          <view class="formItem formItemAgreement">
            <view class="pull-right" @click="wjRouterPush('login')">已有账号去登录？</view>
            <view class="pull-left forgetMecontactUs">
              <button open-type="contact"></button>
              遇到问题，联系客服？
            </view>
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