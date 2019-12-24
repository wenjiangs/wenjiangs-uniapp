<template>
	<view class="page">
    <view class="singleTools">
      <!-- #ifdef H5 || APP-PLUS -->
      <view class="singleToolsItem" @click="showCommentForm">
        <i class="wjsp wjsp-xiaoxi"></i>评论 {{docsSingle.comment_count}}
      </view>
      <!-- #endif -->
      <view class="singleToolsItem" @click="doCategoryCollection">
        <i class="wjsp wjsp-xin"></i>{{collectionText}} {{docsSingle.collection}}
      </view>
      <!-- #ifdef MP-WEIXIN || MP-QQ -->
      <view class="singleToolsItem">
        <button open-type="share" class="shareButton"></button>
        <i class="wjsp wjsp-iconfontfenxiang"></i>分享
      </view>
      <!-- #endif -->
    </view>
    <view class="maskBg" v-if="showMask" @click="hidePopup"></view>
    <view class="publishComment" v-if="showCF">
      <view class="pubTools">
        <view class="pull-left">取消</view>
        <view class="pull-right" @click.stop="checkComment">发布</view>
      </view>
      <view class="pubText">
        <textarea
          fixed="true"
          :placeholder="plaText"
          v-model="newCommentContent"
          cursor-spacing="32rpx"
          show-confirm-bar="false"
          placeholder-class="plaClass"
        ></textarea>
      </view>
    </view>
    <view class="content">
      <scroll-view
        scroll-y="true"
        :style="'height:' + svHeight + 'px;'"
        @scrolltolower="loadMore"
        @scroll="onPageScrollS"
      >
      <view class="docsItem">
        <view class="diImage pull-left">
          <image style="height:160rpx; width:160rpx;" mode="aspectFill" :src="docsSingle.cover"/>
        </view>
        <view class="diText">
          <view class="diTitle">{{docsSingle.name}}</view>
          <view class="diInfo">{{docsSingle.summary}}</view>
          <view class="diMeta">
            <view class="wjModel">{{docsSingle.views}} 浏览</view>
            <view class="wjModel">{{docsSingle.count}} 文档</view>
            <view class="wjModel">{{docsSingle.comment_count}} 评论</view>
          </view>
        </view>
      </view>
      <view class="tabBox">
        <view class="tabs" :class="sTop>tabTop?'tabFixed':''" id="tabAffix">
          <view class="tabItem" :class="cType==1?'active':''" @click="clickTabs(1)">简介</view>
          <view class="tabItem" :class="cType==2?'active':''" @click="clickTabs(2)">
            目录 {{docsSingle.count}}</view>
          <view class="tabItem" :class="cType==3?'active':''" @click="clickTabs(3)">
            评论 {{docsSingle.comment_count}}</view>
        </view>
      </view>
      <view class="docsDescription" v-if="cType==1">
        <view class="richBox">
          <rich-text :nodes="docsSingle.contentNodes"></rich-text>
        </view>
      </view>
      <view class="docsMenu" v-if="cType==2">
        <view class="wjList">
          <view class="wjListCell" @click="wjRouterPush({path:'single', query:{id: item.ID}})"
            v-for="(item, index) in post" :key="index">
            <view class="wjListText">
              <view class="wjListTT">{{item.title}}</view>
            </view>
          </view>
        </view>
        <uni-load-more :status="noPostMore?'noMore':'loading'"></uni-load-more>
      </view>
      <view class="docsComment" v-if="cType==3">
        <loop-comment :comments="comment"
          :noMore="noCommentMore"
          :userID="userInfo.ID*1"
          :isLoading="isCommentLoading"
          :comment_count="docsSingle.comment_count*1"
        ></loop-comment>
      </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>