<template>
	<view class="page pageDeepBg">
    <view class="content">
      <scroll-view
        scroll-y="true"
        :style="'height:' + svHeight + 'px;'"
        @scrolltolower="getList"
      >
        <view class="msgCard">
          <view class="msgCardItem" v-for="(item, index) in dataList" :key="index">
            <view class="msgCardTop">
              <view class="msgCardTime">{{item.send_time}}</view>
              <view class="msgCardAvatar">
                <img :src="item.user.user_avatar">
              </view>
              <view class="msgCardName">{{item.user.display_name}}</view>
              <view class="msgCardTit">{{item.title}}</view>
            </view>
            <view class="msgCardContent"
              v-if="(item.type=='comment' && item.content.item_type=='comment') || 
              (item.type=='collection' && !(item.content.item_type=='user'))
              ">
              <view class="msgCardText" v-if="item.comment">
                <view class="richBox">
                  <rich-text :nodes="item.comment.contentNodes"></rich-text>
                </view>
              </view>
              <view class="commentListPost" v-if="item.post">
                <view class="commentListPostTit">{{item.post.title}}</view>
                <view class="commentListPostMeta">
                  <view class="wjModel">{{item.post.author_name}}</view>
                  <view class="wjModel">{{item.post.comment_count}} 评论</view>
                  <view class="wjModel">{{item.post.views}} 浏览</view>
                </view>
              </view>
            </view>
            <view class="msgCardContent" v-if="item.type=='comment' && item.content.item_type=='reply'">
              <view class="msgCardText">
                <view class="richBox">
                  <rich-text :nodes="item.reply.contentNodes"></rich-text>
                </view>
              </view>
              <view class="msgCardComment">
                <view class="richBox">
                  <rich-text :nodes="item.comment.contentNodes"></rich-text>
                </view>
              </view>
            </view>
          </view>
          <uni-load-more v-if="dataList.length>0" :status="noMore?'noMore':'loading'"></uni-load-more>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>