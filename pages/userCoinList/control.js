export default {
  data() {
		return {
      isLoading: false,
      dataList: [],
      page: 0,
      rows: 10,
      svHeight: 0,
      noMore: false,
    }
  },
  onLoad(options){
    var wInfo = uni.getSystemInfoSync();
    this.svHeight = wInfo.windowHeight - 1;
    this.loadData();
  },
  methods:{
    loadData(){
      if (this.isLoading) return;
      this.isLoading = true;
      this.page++;
      uni.showLoading({
        title: '加载中',
      })
      this.wjPost(this, 'getCoinList', {
        page: this.page,
        rows: this.rows,
      }, (res)=>{
        this.isLoading = false;
        uni.hideLoading();
        // 缓存数据
        if (res.success){
          this.dataList.push(...res.data);
          if(res.data.length<this.rows){
            this.noMore = true;
          }
        }
      })
    }
  }
}