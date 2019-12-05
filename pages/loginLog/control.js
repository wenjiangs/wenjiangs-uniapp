export default {
  data() {
    return {
      userInfo: {},
      page: 0,
      rows: 20,
      dataList:[],
      isLoading: false,
      noMore: false,
      svHeight: 0,
    }
  },
  onLoad(){
    this.userInfo = uni.getStorageSync('userInfo')
    var wInfo = uni.getSystemInfoSync()
    this.svHeight = wInfo.windowHeight - wInfo.windowWidth/750*74 - 1
    this.loadData();
  },
  methods:{
    loadData(){
      if(this.isLoading) return;
      if(this.noMore) return;
      uni.showLoading({
      	title: '加载中'
      })
      this.isLoading = true;
      this.page++;
      this.wjPost(this, 'getLoginLog', {
        page: this.page,
        rows: this.rows,
        user_login: this.userInfo.user_login
      }, (res)=>{
        uni.hideLoading();
        this.dataList.push(...res.data)
        if(res.data.length < this.rows){
          this.noMore = true;
        }
        this.isLoading = false;
      })
    },
  }
}
