<template>
	<view class="page">
    <view class="bottomButton">
      <button type="warn" class="btn btn-danger" @click="checkForm">{{titleText}}</button>
    </view>
    <view class="content">
      <!-- <view class="tabs">
        <view class="tabItem" :class="tabIndex==1?'active':''" @click="tabIndex=1">绑定微信手机号</view>
        <view class="tabItem" :class="tabIndex==2?'active':''" @click="tabIndex=2">绑定其他手机号</view>
      </view> -->
      <view class="formWrap lrFormWrap" v-if="tabIndex==1">
        <view class="formItem">
          <input type="text" class="formControl" v-model="mobile_phone" :placeholder="plaText"/>
        </view>
        <view class="formItem">
          <input type="text" class="formControl formControlSms"
            v-model="sms_code" placeholder="手机验证码"/>
          <button type="primary" class="btn formControlSmsBtn" @click="beforeSendSms" :disabled="isSending">{{btnText}}</button>
        </view>
        <view class="formItem" v-if="!isEmpty(userInfo.mobile_phone)">
          <input type="text" class="formControl" v-model="mobile_phone2" placeholder="新的手机号"/>
        </view>
      </view>
      <!-- <view v-if="tabIndex==2">
        点击下面的按钮，绑定微信手机号。
        <button open-type="getPhoneNumber" @getphonenumber="bindUserPhone">绑定手机号</button>
      </view> -->
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>