<template>
	<view>
    <view class="commentList">
      <view class="commentsItem" v-for="(item, cIndex) in comments" :key="cIndex" :id="'comment-' + item.comment_ID">
        <view class="content-padded">
          <view class="wt-avatar pull-left">
            <image mode="aspectFill" :src="item.avatar"/>
          </view>
          <view class="wt-comments-text">
            <view class="wt-comments-info">
              <view class="wjModel commentAuthor">{{item.comment_author}}</view>
              <view class="comment_floor pull-right" v-if="comment_count>0">{{comment_count-cIndex}} 楼</view>
            </view>
            <view class="wt-comment-content">
              <view class="richBox">
                <rich-text :nodes="item.contentNodes"></rich-text>
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
            <view class="wt-comments-tools">
              <view class="wjModel">{{item.comment_date}}</view>
              <view class="wjModel" v-if="!(item.user_id==userID) && userID>0" @click="reply(item)">回复</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="seatEmpty" v-if="comments.length==0 && !isLoading">
      <view class="seatBox">
        <view class="seatIcon"></view>
        <view class="seatText">还没有评论，快来占个沙发吧！</view>
      </view>
    </view>
    <uni-load-more v-if="comments.length>0" :status="noMore?'noMore':'loading'"></uni-load-more>
	</view>
</template>

<script>
	export default {
    props:{
      comments: {
        type: Array,
        default: ()=>{}
      },
      comment_count: {
        type: Number,
        default: 0,
      },
      userID: {
        type: Number,
        default: 0,
      },
      noMore: {
        type: Boolean,
        default: false,
      },
      isLoading: {
        type: Boolean,
        default: false,
      }
    },
		data() {
			return {};
		},
    methods: {
      reply(e){
        this.$emit('reply', e);
      }
    }
	}
</script>

<style>

</style>
