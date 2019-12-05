export default {
  data() {
		return {
      dataList: [],
      page: 0,
      rows: 10,
      isLoading: false,
      noMore: false,
      collectionText: "收藏",
      svHeight: 0,
      userInfo: {
        ID: 0,
      },
      tabIndex: 0,
    }
  },
  onLoad(options){
    var userInfo = uni.getStorageSync('userInfo');
    if(userInfo){
      this.userInfo = userInfo;
    }
    var wInfo = uni.getSystemInfoSync();
    this.svHeight = wInfo.windowHeight - wInfo.windowWidth/750*88 - 2;
    var topic = uni.getStorageSync('topic');
    if(topic){
      this.dataList = topic;
    }
    this.loadData()
  },
  onShow(){
    // #ifdef H5 || APP-PLUS
    this.getUnreadNum();
    // #endif
  },
  methods:{
    loadData(){
      console.log('开始加载');
      if (this.isLoading) return false;
      this.isLoading = true;
      
      // 第一次加载显示出来
      if(this.page==0){
        uni.showLoading({
          title: '加载中',
        })
      }
      
      this.page++;
      this.wjPost(this, 'getPosts', {
        page: this.page,
        rows: this.rows,
        postType: 'topic',
        taxonomy: 'group',
        sp: 1,
      }, (res)=>{
        this.isLoading = false;
        if(this.page==1){
          uni.hideLoading();
          uni.setStorageSync('topic', res.data);
        }
        if(res.success){
          this.dataList.push(...res.data);
        }
      })
    },
    clickTabs(e){
      this.tabIndex = e;
    },
    doCollection(params){
      this.collection(params.id, params.type, (res)=>{
        if (res.success) {
          if (res.data == 1) {
            this.dataList[params.index].collection++;
            this.dataList[params.index].collection_current = true;
          } else if (res.data == 2) {
            this.dataList[params.index].collection--;
            this.dataList[params.index].collection_current = false;
          }
        }
      });
    }
  }
}