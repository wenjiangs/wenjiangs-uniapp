<template>
	<view>
		<view class="topicList">
		  <view class="topicItem" @click="wjRouterPush({path:'single',query:{id:item.ID}})"
		    v-for="(item, index) in topics" :key="index">
		    <view class="tiTop">
		      <view class="titAvatar pull-left">
		        <image :src="item.author_avatar" mode="aspectFill"/>
		      </view>
		      <view class="titText">
		        <view class="titUserName">{{item.author_name}}</view>
		        <view class="titUserMeta">
		          <view class="wjModel">{{item.date}}</view>
		          <view class="wjModel">{{item.views}} 浏览</view>
		        </view>
		      </view>
		    </view>
		    <view class="tiContent tiAloneContent">
		    <text v-if="item.title.length>0">{{item.title}} - </text>
		    {{item.content}}
		    </view>
		    <view class="topicImgList" v-if="item.thumbnail.length">
		      <view v-if="item.thumbnail.length==1" class="singleImg">
		        <image :src="item.thumbnails[0]"
		          :data-src="item.thumbnail[0]"
		          :data-list="item.thumbnail"
		          mode="aspectFill"/>
		      </view>
		      <view v-if="item.thumbnail.length>1"
		        class="topicImgItem"
		        v-for="(thumb, tIndex) in item.thumbnails" :key="tIndex">
		        <image :src="thumb"
		          :data-list="thumb.thumbnail"
		          mode="aspectFill"/>
		      </view>
		    </view>
		    <view class="singleTools tiFooter">
		      <view class="singleToolsItem">
		        <i class="wjsp wjsp-xiaoxi"></i> <span>评论 {{item.comment_count}}</span>
		      </view>
		      <view class="singleToolsItem" @click.stop="doCollection(item, index)">
		        <i class="wjsp wjsp-xin"></i> <span>{{item.collection_current?'已收藏':'收藏'}} {{item.collection}}</span>
		      </view>
		      <!-- #ifdef MP-WEIXIN || MP-QQ -->
		      <view class="singleToolsItem" @click.stop>
		        <button open-type="share" class="shareButton"></button>
		        <i class="wjsp wjsp-iconfontfenxiang"></i>分享
		      </view>
		      <!-- #endif -->
		    </view>
		  </view>
		</view>
    <view class="seatEmpty" v-if="topics.length==0 && !isLoading">
      <view class="seatBox">
        <view class="seatIcon"></view>
        <view class="seatText">没有更多内容了</view>
      </view>
    </view>
		<uni-load-more v-if="topics.length>0" :status="noMore?'noMore':'loading'"></uni-load-more>
	</view>
</template>

<script>
	export default {
    props: {
      topics: {
        type: Array,
        default: ()=>{},
      },
      collectionText: {
        type: String,
        default: '',
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
			return {
				
			};
		},
    methods: {
      doCollection(item, index){
        this.$emit('doCollection', {id: item.ID, index: index, type: 'topic'})
      }
    }
	}
</script>

<style>

</style>
