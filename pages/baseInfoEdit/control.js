export default {
  data() {
    return {
      userInfo:{},
      userGender: ['保密', '男', '女'],
      locationVal: [],
    }
  },
  onLoad() {
    this.userInfo = uni.getStorageSync('userInfo');
    if(this.userInfo.location){
      this.locationVal = this.userInfo.location.split(' ');
    }
  },
  methods: {
    changeAvatar(){
      uni.chooseImage({
        sizeType: ['compressed'],
        success: (res)=>{
          console.log(res);
          if(res.errMsg == 'chooseImage:ok'){
            uni.uploadFile({
              url: this.APIURL,
              filePath: res.tempFilePaths[0],
              name: 'fileData',
              formData: {
                model: 'uploadFile',
                action: JSON.stringify({
                  user_id: this.userInfo.ID,
                  token: this.userInfo.token,
                })
              },
              success: (res) => {
                var data = JSON.parse(res.data);
                if(data.success){
                  this.userInfo.user_avatar = data.data.filePath
                }
              }
            });
          }
        }
      })
    },
    ugChange(e){
      this.userInfo.gender = this.userGender[e.detail.value];
    },
    checkForm(){
      this.submitForm();
    },
    submitForm(){
      uni.showLoading({
        title: '保存中'
      })
      this.wjPost(this, "updateBaseInfo", this.userInfo, (res)=>{
        uni.hideLoading()
        uni.showToast({
          title: res.message
        })
        if(res.success){
          uni.setStorageSync('userInfo', this.userInfo);
          setTimeout(()=>{
            uni.navigateBack({
              delta: 1
            })
          }, 1500)
        }
      })
    }
  }
}