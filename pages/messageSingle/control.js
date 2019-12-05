export default {
  data() {
		return {
      msgList: [],
      content: '',
      dialogue: {},
      accept_id: '',
      listViewHeight: 0,
      contentHeight: 0,
      scrollViewHeight: 0,
      userInfo: {},
      talkUser: null,
      viewScrollTop: 0,
      isShowPage: false,
    }
  },
  onShow(){
    this.isShowPage = true;
  },
  onLoad(options){
    var wInfo = uni.getSystemInfoSync();
    this.scrollViewHeight = wInfo.windowHeight - 1 - wInfo.windowWidth/750*106;
    this.accept_id = options.id;
    this.userInfo = uni.getStorageSync('userInfo');
    this.getMessages();
    this.getUser(this, this.accept_id, (res)=>{
      this.talkUser = res.data;
      if(this.isShowPage){
        uni.setNavigationBarTitle({
          title: res.data.display_name
        })
      }
    }, false)
  },
  methods:{
    getMessages(){
      if(this.msgList.length==0){
        wx.showLoading({
          title: '加载中',
        })
      }
      this.wjPost(this, 'getMessages', {
        accept_id: this.accept_id
      }, (res)=>{
        if(this.msgList.length==0){
          uni.hideLoading();
        }
        this.msgList = res.data;
        this.$nextTick(()=>{
          this.scrollBottom();
        })
      })
    },
    sendMessage(){
      this.wjPost(this, 'sendMessage', {
        token: this.userInfo.token,
        user_id: this.userInfo.ID,
        send_id: this.userInfo.ID,
        accept_id: this.accept_id,
        title: '',
        content: this.content,
        type: 'private',
        source: 'weixinsp',
      }, (res)=>{})

      // 更新到页面
      this.toViewData(this.content, this.userInfo.ID, this.userInfo.user_avatar);
      this.content = '';

    },
    
    // 更新到页面
    toViewData(content, user_id, avatar){
      var viewData = {
        content: content,
        user_id: user_id,
        user_avatar: avatar
      }
      console.log(viewData);
      this.msgList.push(viewData);
      this.msgList = [...this.msgList];
      this.$nextTick(()=>{
        this.scrollBottom();
      })
    },
    
    // 滚动到底部
    scrollBottom(){
      this.viewScrollTop = this.msgList.length * 500;
    }
  },
  onHide(){
    this.isShowPage = false;
  }
}