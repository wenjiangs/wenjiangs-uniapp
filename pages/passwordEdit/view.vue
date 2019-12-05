<template>
	<view class="page">
    <view class="bottomButton">
      <button type="warn" class="btn btn-danger" @click="checkForm">修改密码</button>
    </view>
    <view class="content">
      <view class="formWrap lrFormWrap">
        <view class="formItem">
          <input type="password" class="formControl" v-model="old_pass" placeholder="原始密码"/>
        </view>
        <view class="formItem">
          <input type="password" class="formControl" v-model="new_pass" placeholder="新密码"/>
        </view>
        <view class="formItem">
          <input type="password" class="formControl" v-model="new_pass2" placeholder="确认密码"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>