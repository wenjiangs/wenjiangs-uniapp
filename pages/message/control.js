export default {
  data() {
		return {
      userInfo: {},
      chatList: [],
      rows: 20,
      page: 1,
      scrollViewHeight: 0,
      isLoading: false,
      isLogin: true,
      sysList: [],
    }
  },
  onShow(){
    let userInfo = uni.getStorageSync('userInfo');
    if(userInfo){
      this.userInfo = userInfo;
      this.getChatList();
      this.getSysList();
    }
    this.pageAuthControl((res)=>{
      if(res.success){
        this.userInfo = res.data;
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }
    });
    // #ifdef H5 || APP-PLUS
    this.getUnreadNum();
    // #endif
  },
  onLoad(){
    var windowObj = uni.getSystemInfoSync();
    var windowHeight = windowObj.windowHeight;
    this.scrollViewHeight = windowHeight - 1;
  },
  methods: {
    getChatList(){
      this.isLoading = true;
      uni.showLoading({
        title: '加载中',
        mask: true,
      })
      this.wjPost(this, 'getChatList', {}, (res)=>{
        uni.hideLoading();
        this.isLoading = false;
        if(res.success){
          this.chatList = res.data;
          uni.setStorageSync('chatList', this.chatList);
        }
      })
    },
    getSysList(){
      this.wjPost(this, 'getSystemMessage', {}, (res)=>{
        this.sysList = res.data;
      })
    }
  }
}