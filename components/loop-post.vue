<template>
	<view>
		<view class="postList" v-if="posts.length>0">
		  <view class="postItem" v-for="(item, index) in posts" :key="index"
        @click="wjRouterPush({path:'single', query:{type:item.post_type, id:item.ID}})">
		    <view class="plThumb" v-if="item.thumbnails && item.thumbnails.length<3">
		      <img :src="item.thumbnails[0]">
		    </view>
		    <view class="plTitle">{{item.title}}</view>
		    <view class="plMul" v-if="item.thumbnails && item.thumbnails.length>=3">
		      <view v-for="(itemThumb, indexThumb) in item.thumbnails" :key="indexThumb">
		        <img :src="itemThumb">
		      </view>
		    </view>
		    <view class="plMeta">
		      <view class="wjModel">{{item.author_name}}</view>
		      <view class="wjModel">{{item.comment_count}} 评论</view>
		      <view class="wjModel">{{item.views}} 浏览</view>
		    </view>
		  </view>
		</view>
		<view class="seatEmpty" v-if="posts.length==0 && !isLoading">
		  <view class="seatBox">
		    <view class="seatIcon"></view>
		    <view class="seatText">没有更多内容了</view>
		  </view>
		</view>
    <uni-load-more v-if="posts.length>0" :status="noMore?'noMore':'loading'"></uni-load-more>
	</view>
</template>

<script>
	export default {
    props:{
      posts: {
        type: Array,
        default: ()=>{},
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
		}
	}
</script>

<style>

</style>
