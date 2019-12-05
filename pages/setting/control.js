export default {
  data() {
		return {
      userInfo: {}
    }
  },
  onShow(){
    this.userInfo = uni.getStorageSync('userInfo');
  },
  onLoad(options){
    
  },
  methods:{
    beforeLogout(){
      uni.showModal({
        title: '提示',
        content: '确认退出文江博客吗？',
        success: (res) => {
          if(res.confirm){
            this.logout();
          }
        }
      })
    }
  }
}