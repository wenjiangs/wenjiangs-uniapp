export default {
  data() {
		return {
      userInfo: null,
      uuid: null,
    }
  },
  onLoad(options){
    var userInfo = uni.getStorageSync('userInfo');
    if(options.uuid){
      this.uuid = options.uuid;
      if(this.isEmpty(userInfo)){
        this.wjRouterPush('login');
      }else{
        this.doConfirmScan();
      }
    }else{
      uni.switchTab({
        url: '/pages/index/view'
      })
    }
  },
  methods:{
    doLogin(){
      uni.showLoading({
        title: '登陆中',
      })
      this.wjPost(this, 'scaningLogin', {
        scaningLogin: this.uuid,
      }, (res)=>{
        uni.showToast({
          title: res.message,
          icon: 'none'
        })
        setTimeout(()=>{
          uni.navigateBack({
            delta: 1,
          })
        }, 1500);
      })
    },
    doCancel(){
      uni.navigateBack({
        delta: 1,
      })
    },
    doConfirmScan(){
      uni.showLoading({
        title: '请稍后'
      });
      console.log('开始验证');
      this.wjPost(this, 'confirmScan', {
        confirmScan: this.uuid,
      }, (res)=>{
        console.log(res);
        uni.hideLoading()
        uni.showToast({
          title: res.message,
          icon: 'none',
        })
        if(!res.success){
          setTimeout(()=>{
            uni.navigateBack({
              delta: 1,
            })
          }, 1500)
        }
      })
    }
  }
}