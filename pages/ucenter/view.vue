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
      <view class="uHead" @click="toAuthor">
        <view class="uAvatar">
          <img :src="$imgUrl(userInfo.user_avatar)"/>
        </view>
        <view class="uName">{{userInfo.display_name}}</view>
        <!-- #ifdef H5 || APP-PLUS -->
        <view class="uID">查看个人主页</view>
        <!-- #endif -->
        <!-- #ifndef H5 || APP-PLUS -->
        <view class="uID">注册时间：{{userInfo.user_registered}}</view>
        <!-- #endif -->
      </view>
      <view class="uFastTools">
        <!-- #ifdef H5 || APP-PLUS -->
        <view class="uftItem" @click="wjRouterPush('userPost')">
          <view class="uftiT">文章</view>
          <view class="uftiN">{{userInfo.post_count}}</view>
        </view>
        <!-- #endif -->
        <view class="uftItem" @click="wjRouterPush('userCollection')">
          <view class="uftiT">收藏</view>
          <view class="uftiN">{{userInfo.collection_count}}</view>
        </view>
        <!-- #ifdef H5 || APP-PLUS -->
        <view class="uftItem" @click="wjRouterPush('userFans')">
          <view class="uftiT">粉丝</view>
          <view class="uftiN">{{userInfo.fans_count}}</view>
        </view>
        <!-- #endif -->
        <view class="uftItem">
          <view class="uftiT">人气</view>
          <view class="uftiN">{{userInfo.views}}</view>
        </view>
      </view>
      <!-- #ifdef H5 || APP-PLUS -->
      <view class="lookCoin" @click="wjRouterPush('userCoin')">
        <img mode="widthFix" src="http://www.wenjiangs.com/wp-content/uploads/2019/11/lookCoin.jpg"/>
      </view>
      <!-- #endif -->
      <!-- #ifdef H5 || APP-PLUS -->
      <view class="uList">
       <view class="wjList">
          <view class="wjListCell" @click="wjRouterPush('userPost')">
            <view class="wjListIcon">
              <view class="wjsp wjsp-wenzhangguanli"></view>
            </view>
            <view class="wjListText">
              <view class="wjListTN">{{userInfo.post_count}}</view>
              我的文章
            </view>
          </view>
          <view class="wjListCell" @click="wjRouterPush('userComment')">
            <view class="wjListIcon">
              <view class="wjsp wjsp-xiaoxi"></view>
            </view>
            <view class="wjListText">
              <view class="wjListTN">{{userInfo.comment_count}}</view>
              我的评论
            </view>
          </view>
          <view class="wjListCell" @click="wjRouterPush('userTopic')">
            <view class="wjListIcon">
              <view class="wjsp wjsp-application"></view>
            </view>
            <view class="wjListText">
              <view class="wjListTN">{{userInfo.topic_count}}</view>
              我的话题
            </view>
          </view>
          <view class="wjListCell" @click="wjRouterPush('userReply')">
            <view class="wjListIcon">
              <view class="wjsp wjsp-liaotian2"></view>
            </view>
            <view class="wjListText">
              <view class="wjListTN">{{userInfo.reply_count}}</view>
              我的回复
            </view>
          </view>
        </view>
        <!-- #endif -->
        <view class="wjList">
          <view class="wjListCell" @click="wjRouterPush('userCollection')">
            <view class="wjListIcon">
              <view class="wjsp wjsp-xin"></view>
            </view>
            <view class="wjListText">
              <view class="wjListTN">{{userInfo.collection_count}}</view>
              我的收藏
            </view>
          </view>
        </view>
        
        <view class="wjList">
          <!-- #ifdef H5 || APP-PLUS -->
          <view class="wjListCell" @click="wjRouterPush('setting')">
            <view class="wjListIcon">
              <view class="wjsp wjsp-shezhi2"></view>
            </view>
            <view class="wjListText">设置</view>
          </view>
          <!-- #endif -->
          <view class="wjListCell" @click="wjRouterPush('about')">
            <view class="wjListIcon">
              <view class="wjsp wjsp-dingdan"></view>
            </view>
            <view class="wjListText">关于我们</view>
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