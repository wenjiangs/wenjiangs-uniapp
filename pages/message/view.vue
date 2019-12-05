<template>
<view class="page">
  <view class="needAuthLayer" v-if="!isLogin">
    <view class="needAuthLayer2">
      <view class="nalInfo">该页面需要您登陆以后才能查看，点击下面的按钮去登陆账号。</view>
      <view class="btn btn-danger" @click="wjRouterSwitchTab('index')">返回</view>
      <view class="btn btn-primary" @click="wjRouterPush('login')">去登陆</view>
    </view>
  </view>
  <view class="content">
    <scroll-view scroll-y :style="'height:' + scrollViewHeight + 'px'">
      <view class="msgTop" v-if="sysList.collection">
        <view class="msgTopItem" @click="wjRouterPush({path:'messageCard',query:{type:'collection'}})">
          <view class="msgTopImage">
            <img src="http://www.wenjiangs.com/wp-content/themes/wtheme/images/sysCollection.jpg"/>
            <view class="noReadBadge" v-if="sysList.collection.length && sysList.collection[0].noRead>0">
              {{sysList.collection[0].noRead}}
            </view>
          </view>
          <view class="msgTopText">收藏消息</view>
        </view>
        <view class="msgTopItem" @click="wjRouterPush({path:'messageCard',query:{type:'comment'}})">
          <view class="msgTopImage">
            <img src="http://www.wenjiangs.com/wp-content/themes/wtheme/images/sysMessage.jpg"/>
            <view class="noReadBadge" v-if="sysList.comment.length && sysList.comment[0].noRead>0">
              {{sysList.comment[0].noRead}}
            </view>
          </view>
          <view class="msgTopText">评论消息</view>
        </view>
        <view class="msgTopItem" @click="wjRouterPush({path:'messageCard',query:{type:'system'}})">
          <view class="msgTopImage">
            <img src="http://www.wenjiangs.com/wp-content/themes/wtheme/images/sysSetting.jpg"/>
            <view class="noReadBadge" v-if="sysList.system.length && sysList.system[0].noRead>0">
              {{sysList.system[0].noRead}}
            </view>
          </view>
          <view class="msgTopText">系统消息</view>
        </view>
      </view>
      <view class="msgList" v-if="chatList.length">
        <view class="msgItem" v-for="(item, index) in chatList"
          :key="index" @click="wjRouterPush({path:'messageSingle', query:{id: item.user_id}})">
          <view class="msgImage pull-left">
            <image :src="item.user_avatar" />
            <view class="noReadBadge" v-if="item.noRead>0">{{item.noRead}}</view>
          </view>
          <view class="msgText">
            <view class="msgTitle">
            <view class="pull-right">{{item.send_time}}</view>
            {{item.display_name}}
            </view>
            <view class="msgSummary">{{item.content}}</view>
          </view>
        </view>
      </view>
      <view class="seatEmpty" v-if="chatList.length==0 && !isLoading">
        <view class="seatBox">
          <view class="seatIcon"></view>
          <view class="seatText">暂无内容</view>
        </view>
      </view>
    </scroll-view>
  </view>
</view>
</template>

<script>
import control from './control.js';
export default control;
</script>