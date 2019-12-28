<template>
  <view class="page">
    <view class="singleTools">
      <!-- #ifdef H5 || APP-PLUS -->
      <view class="singleToolsItem" @click="showCommentForm">
        <i class="wjsp wjsp-xiaoxi"></i>评论 {{post.comment_count}}
      </view>
      <!-- #endif -->
      <view class="singleToolsItem" @click="doPostCollection">
        <i class="wjsp wjsp-xin"></i>{{collectionText}} {{post.collection}}
      </view>
      <!-- #ifdef MP-WEIXIN || MP-QQ -->
      <!-- <view class="singleToolsItem">
        <button open-type="share" class="shareButton"></button>
        <i class="wjsp wjsp-iconfontfenxiang"></i>分享
      </view> -->
      <!-- #endif -->
      <view class="singleToolsItem" @click="toTrash" v-if="userInfo.ID==post.post_author">
        <i class="wjsp wjsp-jiufuqianbaoicon05"></i>删除
      </view>
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
        :style="'height:' + scrollViewHeight + 'px;'"
        @scrolltolower="get_comment"
      >
      <view class="singleHead">
        <view class="singleTitle">{{post.title}}</view>
        <view class="tiTop singTop" @click="wjRouterPush({path:'author', query:{id:post.post_author}})">
          <view class="titAvatar pull-left">
            <image :src="post.author_avatar" mode="aspectFill"/>
          </view>
          <view class="titText">
            <view v-if="!post.collection_author"
              class="btn btn-primary btn-small pull-right" @click.stop="doUserCollection">
              关注</view>
            <view v-else
            class="btn btn-empty btn-primary btn-small pull-right" @click.stop="doUserCollection">
              已关注</view>
            <view class="titUserName">{{post.author_name}}</view>
          </view>
        </view>
        <view class="titUserMeta">
          <view class="wjModel pull-right">{{post.date}}</view>
          <view class="wjModel">{{post.word_count}} 字数</view>
          <view class="wjModel">{{post.views}} 阅读</view>
        </view>
      </view>
      <view class="richBox">
        <rich-text :nodes="post.contentNodes"></rich-text>
      </view>
      <view class="wjMod">
        <view class="wjModTilte">
          <view class="wjModMore pull-right">更多 <i class="wjsp wjsp-right"></i></view>
          <view class="wjModTilteTxt">推荐文章</view>
        </view>
        <loop-post :posts="relevantPosts" :showLoading="false"></loop-post>
      </view>

      <view class="wjMod">
        <view class="wjModTilte">
          <view class="wjModTilteTxt">全部评论（{{post.comment_count}}）</view>
        </view>
        <loop-comment
          :comments="comment"
          :comment_count="post.comment_count*1"
          :userID="userInfo.ID*1"
          :noMore="noMore"
          :isLoading="isLoading"
          @reply="reply"
        >
        </loop-comment>
      </view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
import control from './control.js';
export default control;
</script>