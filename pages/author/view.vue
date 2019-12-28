<template>
  <view class="staticPage" @click="hideShowMore">
    <view class="userBg"></view>
    <view class="authorTotal">
      <view class="auAvatar">
        <image :src="author.user_avatar"/>
      </view>
      <view class="auText">
        <view class="auName">{{author.display_name}}</view>
        <view class="auTotal">
          <view class="wjModel"><text>{{author.collection_count}}</text> 关注</view>
          <view class="wjModel"><text>{{author.fans_count}}</text> 粉丝</view>
          <view class="wjModel"><text>{{author.views}}</text> 人气</view>
        </view>
      </view>
    </view>
    <view class="authorDo">
      <view class="btn btn-success pull-left" @click="doCollection" v-if="author.collection_user">
        <i class="wjsp wjsp-dui"></i> <view>已关注</view>
      </view>
      <view class="btn btn-success pull-left" @click="doCollection" v-else>
        <i class="wjsp wjsp-jia"></i> <view>加关注</view>
      </view>
      <!-- #ifdef H5 || APP-PLUS -->
      <view class="btn btn-success btn-empty pull-left"
        @click="wjRouterPush({path:'messageSingle', query:{id:author.ID}})">
        <i class="wjsp wjsp-xiaoxi"></i> <view>发信息</view>
      </view>
      <!-- #endif -->
      <view class="btn pull-right auDoMore" @click.stop="isShowMore"><i class="wjsp wjsp-liebiao"></i></view>
      <view class="dropDown" v-if="showMore">
        <view class="ddItem"
          @click="wjRouterPush({path:'profile', query:{id:author.ID}})">
          <i class="wjsp wjsp-File"></i> 查看资料</view>
        <!-- #ifdef MP-WEIXIN -->
        <!-- <view class="ddItem ddItemShare">
          <button data-type="share"></button>
          <i class="wjsp wjsp-iconfontfenxiang"></i> 推荐给好友
        </view> -->
        <!-- #endif -->
        <view class="ddItem" @click="wjRouterPush({path:'report', query:{type:'user', id: author_id}})">
          <i class="wjsp wjsp-xianshi_jinggao"></i> 举报
        </view>
      </view>
    </view>
    <view class="tabBox">
      <view class="tabs" :class="sTop>=beforeTop?'tabFixed':''">
        <view class="tabItem" :class="dataType==1?'active':''" @click="tabClick(1)">文章</view>
        <view class="tabItem" :class="dataType==2?'active':''" @click="tabClick(2)">评论</view>
        <view class="tabItem" :class="dataType==3?'active':''" @click="tabClick(3)">专辑</view>
        <view class="tabItem" :class="dataType==4?'active':''" @click="tabClick(4)">话题</view>
        <view class="tabItem" :class="dataType==5?'active':''" @click="tabClick(5)">回复</view>
      </view>
    </view>
    <view class="tabCon" v-if="dataType==1">
      <loop-post :posts="posts" :isLoading="isLoadingPost" :noMore="noMorePost"></loop-post>
    </view>
    <view class="tabCon" v-if="dataType==2">
      <loop-comment :comments="comments" :isLoading="isLoadingComment" :noMore="noMoreComment"></loop-comment>
    </view>
    <view class="tabCon" v-if="dataType==3">
      <loop-category :docs="docs" type="docs" :isLoading="isLoadingDocs" :noMore="noMoreDocs"></loop-category>
    </view>
    <view class="tabCon" v-if="dataType==4">
      <loop-topic :topics="topics" :isLoading="isLoadingTopic" :noMore="noMoreTopic"></loop-topic>
    </view>
    <view class="tabCon" v-if="dataType==5">
      <loop-comment :comments="replys" :isLoading="isLoadingReply" :noMore="noMoreReply"></loop-comment>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>