export default {
  data() {
		return {
      systemInfo: {
        version: '0.0.0'
      },
      pages: [],
    }
  },
  onLoad(options){
    var pages = uni.getStorageSync('singlePages')
    if(pages){
      this.pages = pages;
    }
    this.getSystemInfo();
    this.getPages();
  },
  methods:{
    getSystemInfo(){
      this.wjPost(this, "systemInfo", {}, (res)=>{
        this.systemInfo = res.data;
      })
    },
    getPages(){
      uni.showLoading({
      	title: '加载中'
      })
      this.wjPost(this, 'getPages', {}, (res)=>{
        uni.hideLoading();
        this.pages = res.data;
        uni.setStorageSync('singlePages', this.pages);
      })
    },
  }
}