<template>
	<view class="page">
    <view class="bottomButton" @click="checkForm">
      <view class="btn btn-danger">找回密码</view>
    </view>
    <view class="content">
      <view class="formWrap lrFormWrap">
        <view class="formItem">
          <input type="text" class="formControl" v-model="user_login" placeholder="用户名/邮箱地址/手机号"/>
        </view>
        <view class="formItem">
          <input type="text" class="formControl formControlSms" v-model="user_code"
            placeholder="填写右侧验证码"/>
          <view class="formControlSmsBtn imgCode">
            <img @click="reLoadImgCode" :src="imgCodeUrl"/>
          </view>
        </view>
        <view class="formItem">
          <input type="text" class="formControl formControlSms"
            v-model="email_code" placeholder="邮箱验证码"/>
          <view class="btn formControlSmsBtn" @click="beforeSend">{{sendTxt}}</view>
        </view>
        <view class="formItem">
          <input type="text" class="formControl" v-model="new_password" placeholder="新密码"/>
        </view>
        <view class="formItem formItemAgreement">
        <view class="pull-left forgetMecontactUs">
          <button open-type="contact"></button>
          遇到问题，联系客服？
        </view>
        <view class="pull-right forgetMecontactUs">
          <button open-type="contact"></button>
          人工申诉找回密码
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