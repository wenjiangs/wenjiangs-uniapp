<template>
  <view class="page noPageBorder">
    <view class="content">
      <view class="getCoinRule" @click="wjRouterPush({path:'page', query:{id:86585}})">金币获取规则</view>
      <view class="uCoinTop">
        <view class="uCoinTopVal">{{userInfo.user_coin}}</view>
        <view class="uCoinTopLabel">我的剩余金币</view>
        <view class="uCoinBtn">
          <view class="btn btn-empty btn-small btn-radius" @click="wjRouterPush('userCoinList')">金币明细</view>
          <view class="btn btn-empty btn-small btn-radius">做任务赚金币</view>
        </view>
      </view>
      <view class="tick">
        <view class="tickBox">
          <view class="uCoinInfo">每日签到赚金币</view>
          <view class="tickBox2">
            <view class="tickItem" :class="item.is_sign?'active':''" @click="userSign(item, index)" v-for="(item, index) in signDate"
              :key="index">
              <view class="tickCoin">{{item.sign_val}}</view>
              <view class="tickDate">{{item.time}}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="wjMod">
        <view class="wjModTilte">
          <view class="wjModTilteTxt">完成任务领金币</view>
        </view>
        <view class="coinTask">
          <view class="coinTaskItem">
            <view class="ctiLeft pull-left">
              <view class="ctiTit">浏览文章（{{coinTaskInfo.browsePost}}/3）</view>
              <view class="ctiTitSub">浏览文章得金币2金币/篇</view>
            </view>
            <view class="ctiLeft pull-right">
              <view class="btn btn-danger btn-small btn-radius" @click="wjRouterSwitchTab('index')" v-if="coinTaskInfo.browsePost<3">去看看</view>
              <view class="btn btn-empty btn-small btn-radius" v-else>已完成</view>
            </view>
          </view>
          <view class="coinTaskItem">
            <view class="ctiLeft pull-left">
              <view class="ctiTit">浏览话题（{{coinTaskInfo.browseTopic}}/3）</view>
              <view class="ctiTitSub">浏览话题得金币2金币/篇</view>
            </view>
            <view class="ctiLeft pull-right">
              <view class="btn btn-danger btn-small btn-radius" @click="wjRouterSwitchTab('topic')" v-if="coinTaskInfo.browseTopic<3">去看看</view>
              <view class="btn btn-empty btn-small btn-radius" v-else>已完成</view>
            </view>
          </view>
          <view class="coinTaskItem">
            <view class="ctiLeft pull-left">
              <view class="ctiTit">浏览专栏文章（{{coinTaskInfo.browseDoc}}/3）</view>
              <view class="ctiTitSub">浏览专栏文章得金币2金币/篇</view>
            </view>
            <view class="ctiLeft pull-right">
              <view class="btn btn-danger btn-small btn-radius" @click="wjRouterSwitchTab('docs')" v-if="coinTaskInfo.browseDoc<3">去看看</view>
              <view class="btn btn-empty btn-small btn-radius" v-else>已完成</view>
            </view>
          </view>
          <view class="coinTaskItem">
            <view class="ctiLeft pull-left">
              <view class="ctiTit">发布评论（{{coinTaskInfo.submitCommentPost}}/3）</view>
              <view class="ctiTitSub">发布评论得金币5金币/篇</view>
            </view>
            <view class="ctiLeft pull-right">
              <view class="btn btn-danger btn-small btn-radius" @click="wjRouterSwitchTab('index')" v-if="coinTaskInfo.submitCommentPost<3">去看看</view>
              <view class="btn btn-empty btn-small btn-radius" v-else>已完成</view>
            </view>
          </view>
          <view class="coinTaskItem">
            <view class="ctiLeft pull-left">
              <view class="ctiTit">发布回复（{{coinTaskInfo.submitCommentTopic}}/3）</view>
              <view class="ctiTitSub">发布回复得金币5金币/篇</view>
            </view>
            <view class="ctiLeft pull-right">
              <view class="btn btn-danger btn-small btn-radius" @click="wjRouterSwitchTab('topic')" v-if="coinTaskInfo.submitCommentTopic<3">去看看</view>
              <view class="btn btn-empty btn-small btn-radius" v-else>已完成</view>
            </view>
          </view>
          <view class="coinTaskItem">
            <view class="ctiLeft pull-left">
              <view class="ctiTit">发布专栏评论（{{coinTaskInfo.submitCommentDoc}}/3）</view>
              <view class="ctiTitSub">发布专栏评论得金币5金币/篇</view>
            </view>
            <view class="ctiLeft pull-right">
              <view class="btn btn-danger btn-small btn-radius" @click="wjRouterSwitchTab('docs')" v-if="coinTaskInfo.submitCommentDoc<3">去看看</view>
              <view class="btn btn-empty btn-small btn-radius" v-else>已完成</view>
            </view>
          </view>
          <view class="coinTaskItem">
            <view class="ctiLeft pull-left">
              <view class="ctiTit">发布文章（{{coinTaskInfo.submitCommentDoc}}/1）</view>
              <view class="ctiTitSub">发布文章并审核通过得金币20金币/篇</view>
            </view>
            <view class="ctiLeft pull-right">
              <view class="btn btn-danger btn-small btn-radius" @click="wjRouterPush('publishPost2')" v-if="coinTaskInfo.submitCommentDoc<1">去看看</view>
              <view class="btn btn-empty btn-small btn-radius" v-else>已完成</view>
            </view>
          </view>
          <view class="coinTaskItem">
            <view class="ctiLeft pull-left">
              <view class="ctiTit">发布话题（{{coinTaskInfo.submitCommentDoc}}/1）</view>
              <view class="ctiTitSub">发布话题并审核通过得金币20金币/篇</view>
            </view>
            <view class="ctiLeft pull-right">
              <view class="btn btn-danger btn-small btn-radius" @click="wjRouterPush('publishPost2')" v-if="coinTaskInfo.submitCommentDoc<1">去看看</view>
              <view class="btn btn-empty btn-small btn-radius" v-else>已完成</view>
            </view>
          </view>
          <view class="coinTaskItem">
            <view class="ctiLeft pull-left">
              <view class="ctiTit">每日登陆</view>
              <view class="ctiTitSub">每天登陆即可获得5金币</view>
            </view>
            <view class="ctiLeft pull-right">
              <view class="btn btn-empty btn-small btn-radius">已完成</view>
            </view>
          </view>
          <!-- <view class="coinTaskItem">
            <view class="ctiLeft pull-left">
              <view class="ctiTit">花园种树</view>
              <view class="ctiTitSub">浇水种树果实成熟得金币</view>
            </view>
            <view class="ctiLeft pull-right">
              <view class="btn btn-danger btn-small btn-radius" @click="wjRouterPush('gardenGame')">去看看</view>
            </view>
          </view> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import control from './control.js';
  export default control;
</script>
