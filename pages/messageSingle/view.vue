<template>
	<view class="page">
  <view class="sendMsgBox">
    <view class="smbBtn pull-right">
      <view class="btn btn-primary" @click="sendMessage">发送</view>
    </view>
    <view class="smbInput">
      <textarea
        placeholder="请输入"
        auto-height="true"
        fixed="true"
        v-model="content"
        cursor-spacing="32rpx"
        :show-confirm-bar="false"
      ></textarea>
    </view>
  </view>
  <scroll-view scroll-y="true" class="listView"
    :scroll-top="viewScrollTop"
    :style="'height:' + scrollViewHeight + 'px'"
  >
  <view class="smbList" v-if="msgList.length">
    <!-- <view class="smbItem">
      <view class="smbNotice">
        <view>2018-12-10 11:15:54</view>
      </view>
    </view> -->
    <view
      v-for="(item, index) in msgList" :key="index"
      class="smbItem" :class="item.user_id==userInfo.ID?'smbRight':''"
    >
      <view class="smbAvatar" @click="wjRouterPush({path:'author', query:{id:item.user_id}})" :class="item.user_id==userInfo.ID?'pull-right':'pull-left'">
        <image :src="item.user_avatar"/>
      </view>
      <view class="smbText" :class="item.user_id==userInfo.ID?'pull-right':'pull-left'">
        <view class="smbContent">{{item.content}}</view>
      </view>
    </view>
    <!-- <view class="smbItem smbRight">
      <view class="smbAvatar pull-right">
        <image src="http://www.wenjiangs.com/wp-content/uploads/2017/05/4587.jpg"/>
      </view>
      <view class="smbText pull-right">
        <view class="smbContent">CSS 实现两端 3 种方法 </view>
      </view>
    </view> -->
    <!-- <view class="smbItem smbSys">
      <view class="smbSysImage">
        <image src="http://www.wenjiangs.com/wp-content/uploads/2018/12/jianpan.jpg"/>
      </view>
      <view class="smbSysText">Keymaster.js 快速绑定键盘操盘操作的 JavaScript 库</view>
      <view class="smbSysInfo">技巧讲解的文字内容技巧讲解的文字内容,技巧讲解的文字字内容技巧讲解的文字内容。</view>
    </view>
    <view class="smbItem smbOnlyText">
      <view class="smbOnlyTextTitle">文章评论通知</view>
      <view class="smbOnlyTextTime">2018-12-13 12:52:27</view>
      <view class="smbOnlyTextCon">您的文章被 谁谁谁 评论了，快去看看吧！</view>
      <view class="smbOnlyTextTo">查看详情</view>
    </view>
    <view class="smbItem smbItemOrso">
      <view class="smbItemOrsoImage pull-left">
        <image src="http://www.wenjiangs.com/wp-content/uploads/2018/12/jianpan_200x150.jpg"/>
      </view>
      <view class="smbItemOrsoText">
        <view class="smbItemOrsoTitle">Keymaster.js 快速绑定键盘操作的 JavaScript 库</view>
        <view class="smbItemOrsoInfo">Keymaster.js 是一个 JavaScript 的库，用户绑定键盘的快捷方式操作，他是一个轻量级的插件，压缩版本…</view>
      </view>
    </view> -->
  </view>
  </scroll-view>
</view>
</template>

<script>
import control from './control.js';
export default control;
</script>