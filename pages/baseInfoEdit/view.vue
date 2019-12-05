<template>
	<view class="page">
    <view class="bottomButton">
      <button class="btn btn-danger" @click="checkForm">保存资料</button>
    </view>
    <view class="content">
      <view class="wjList settingList">
        <view class="wjListCell wjListCellNoRight" @click="changeAvatar">
          <view class="wjListText stAvatar">
            <view class="wjListTA">
              <img :src="userInfo.user_avatar" mode="aspectFill"/>
            </view>
            头像
          </view>
        </view>
        <view class="wjListCell wjListCellNoRight">
          <view class="wjListText">
            <view class="wjListTN">
              <input type="text" placeholder="请输入昵称" placeholder-class="plaClass" v-model="userInfo.display_name"/>
            </view>
            昵称
          </view>
        </view>
        <view class="wjListCell">
          <picker
            mode="region"
          >
          <view class="wjListText">
            <view class="wjListTN">
              {{locationVal.join(' ')}}
            </view>
            地址
          </view>
          </picker>
        </view>
        <view class="wjListCell wjListCellNoRight mulText">
          <view class="wjListText">
            <view class="wjListTE">
              详细地址
              <textarea
                placeholder-class="plaClass"
                placeholder="请输入详细地址"
                v-model="userInfo.location2"
              ></textarea>
            </view>
          </view>
        </view>
        <view class="wjListCell">
          <view class="wjListText">
            <view class="wjListTN">
              <picker :range="userGender" @change="ugChange">
                <input type="text" disabled="disabled" placeholder="请选择" placeholder-class="plaClass" v-model="userInfo.gender"/>
              </picker>
            </view>
            性别
          </view>
        </view>
        <view class="wjListCell wjListCellNoRight mulText">
          <view class="wjListText">
            个性说明
            <view class="wjListTE">
              <textarea
                placeholder-class="plaClass"
                placeholder="请输入详细地址"
                v-model="userInfo.description"
              ></textarea>
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