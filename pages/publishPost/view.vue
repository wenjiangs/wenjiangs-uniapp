<template>
	<view class="page">
    <view class="editor-toolbar">
      <view><i class="wjsp wjsp-wenzi" @tap="insertText"></i></view>
      <view><i class="wjsp wjsp-tupian"></i></view>
      <view><i class="wjsp wjsp-xianline22" @tap="insertDivider"></i></view>
      <view><i class="wjsp wjsp-chexiao" @tap="undo"></i></view>
      <view><i class="wjsp wjsp-chexiao whuifu" @tap="redo"></i></view>
      <view><i class="wjsp wjsp-qingkonghuancun" @tap="clear"></i></view>
      <view><i class="wjsp wjsp-h" @tap="clear"></i></view>
      <view><i class="wjsp wjsp-h1" @tap="clear"></i></view>
    </view>
    <view class="editorBtn btn btn-primary">发布</view>
    <view class="content">
      <view class="editor-container">
        <editor
          id="editor"
          class="ql-container"
          placeholder-class="plaClass"
          placeholder="请输入内容"
          @ready="onEditorReady"
        ></editor>
      </view>
    </view>
  </view>
</template>

<script>
import control from './control.js';
export default control;
</script>