<template>
	<view class="uploadBox">
		<view class="uploadItem" v-for="(item, index) in imgObj" :key="index"  @click="choosePic(item)">
      <img :src="item.imgurl" v-if="item.imgtype>0"/>
      <view class="uploadClose" @click.stop="delPic(index)" v-if="item.imgtype>0"></view>
    </view>
	</view>
</template>

<script>
	export default {
    props:{
      count: {
        type: Number,
        default: 5
      },
      type: {
        type: String,
        default: '',
      }
    },
		data() {
			return {
				imgObj: [{ imgtype: 0, imgurl: '' }],
        imgObjEd: [],
        userInfo: {},
			};
		},
    methods:{
      choosePic(e){
        if(e.imgtype==1) return;
        uni.chooseImage({
          count: this.count - this.imgObj.length + 1,
        	success:(res)=>{
            if(res.errMsg == "chooseImage:ok"){
              this.imgObj.splice(this.imgObj.length-1, 1);
              var uploadEd = this.imgObj.length;
              var uploadNumEd = 0;
              var uploadNum = res.tempFilePaths.length;
              for(let i=0; i<uploadNum; i++){
                uni.showLoading({
                	title: '上传中（' + uploadNumEd + '/' + uploadNum + '）',
                  mask: true,
                })
                this.imgObj.push({ imgtype: 1, imgurl: res.tempFilePaths[i] })
                this.imgObj = [...this.imgObj];
                console.log(uploadEd + i);
                this.updatePic(res.tempFilePaths[i], uploadEd + i, (res)=>{
                  uploadNumEd++
                  uni.showLoading({
                  	title: '上传中（' + uploadNumEd + '/' + uploadNum + '）',
                    mask: true,
                  })
                  if(uploadNumEd == uploadNum){
                    uni.hideLoading()
                  }
                  // this.imgObj[res.index].imgurl = this.WEBURL + res.url;
                  this.imgObjEd.push(this.WEBURL + res.data.filePath);
                  this.dataToPage();
                })
              }
              if(this.imgObj.length<this.count){
                this.imgObj.push({ imgtype: 0, imgurl: '' })
              }
            }
        	}
        })
      },
      updatePic(file, index, cb){
        uni.uploadFile({
          url: this.APIURL,
          filePath: file,
          name: 'fileData',
          formData: {
            model: 'uploadFile',
            action: JSON.stringify({
              user_id: this.userInfo.ID,
              token: this.userInfo.token,
            })
          },
          success: (res)=>{
            var data = JSON.parse(res.data);
            console.log(data);
            data.index = index;
            if(data.success){
              cb(data)
            }
          },
        })
      },
      delPic(index){
        if(this.imgObj.length==this.count && this.imgObj[this.imgObj.length-1].imgtype==1){
          this.imgObj.push({ imgtype: 0, imgurl: '' })
        }
        this.imgObj.splice(index, 1);
        this.imgObjEd.splice(index, 1);
        this.imgObj = [...this.imgObj];
        this.dataToPage();
      },
      // 发送到页面
      dataToPage(){
        this.$emit('uploaded', {type: this.type, data: this.imgObjEd});
      }
    },
    mounted() {
      this.userInfo = uni.getStorageSync('userInfo');
    }
	}
</script>

<style>
.uploadBox{ padding:20upx 0 0; overflow: hidden; }
.uploadItem{
  background: url(~@/static/img/plus.png) no-repeat center;
  background-size: 110upx;
  height:110upx;
  width: 110upx;
  margin: 0 20upx 20upx 0;
  position: relative;
  float: left;
}
.uploadItem img{
  height:110upx;
  width: 110upx;
  border-radius: 5upx;
}
.uploadClose{
  position: absolute;
  right: -18upx;
  top:-18upx;
  background: url(~@/static/img/close-img.png) no-repeat center;
  background-size: 100%;
  height: 36upx;
  width: 36upx;
}
</style>
