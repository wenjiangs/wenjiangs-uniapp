export default {
  data() {
		return {
      scrollViewHeight: 0,
      dataType: 1,
      dataList: [],
      userInfo: null,
      isLoading: false,
      noMore: false,
      page: 0,
      rows: 20,
      scrollViewHeight: 0,
    }
  },
  onShow(){
    this.userInfo = uni.getStorageSync('userInfo');
  },
  onLoad(options){
    var windowObj = uni.getSystemInfoSync();
    this.windowWidth = windowObj.windowWidth;
    this.scrollViewHeight = windowObj.windowHeight - windowObj.windowWidth/750*90-1;
    this.getCollection();
  },
  methods:{
    getCollection(){
      if(this.isLoading) return;
      if(this.noMore) return;
      this.isLoading = true;
      uni.showLoading({
        title: '加载中'
      })
      this.page++;
      this.wjPost(this, 'userCollection', {
        page: this.page,
        rows: this.rows,
        dataType: this.dataType
      }, (res)=>{
        uni.hideLoading();
        this.isLoading = false;
        if(res.data.length<this.rows){
          this.noMore = true;
        }
        this.dataList.push(...res.data);
      })
    },
    tabClick(e){
      this.dataType = e;
      this.page = 0;
      this.dataList = [];
      this.noMore = false;
      this.getCollection();
    }
  }
}