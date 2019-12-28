export default {
  data() {
    return {
      userInfoDefalut: {
        display_name: '点击授权登录',
        user_avatar: this.WEBURL + '/wp-content/themes/wtheme/images/avatars.png',
        post_count: 0,
        collection_count: 0,
        fans_count: 0,
        views: 0,
        comment_count: 0,
        topic_count: 0,
        reply_count: 0,
      },
      userInfo: {},
      isLogin: false,
    }
  },
  onShow(){
    var userInfo = uni.getStorageSync('userInfo');
    if(userInfo){
      this.userInfo = userInfo;
      this.isLogin = true;
    }else{
      this.userInfo = this.deepCopy(this.userInfoDefalut);
    }
    this.getUser(this, this.userInfo.ID, (res)=>{
      if(res.success){
        this.userInfo = res.data;
      }else{
        this.userInfo = this.deepCopy(this.userInfoDefalut);
        this.isLogin = false;
      }
    });
    // #ifdef H5 || APP-PLUS
    this.getUnreadNum();
    // #endif
  },
  onLoad() {
  },
  methods: {
    toAuthor() {
      // #ifdef H5 || APP-PLUS
      this.wjRouterPush({
        path: 'author',
        query: {
          id: this.userInfo.ID
        }
      });
      // #endif
    }
  }
}