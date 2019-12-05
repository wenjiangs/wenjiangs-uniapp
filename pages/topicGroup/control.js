export default {
  data() {
		return {
      isLoading: false,
      dataList: [],
      page: 0,
      rows: 50,
      svHeight: 0,
      noMore: false,
    }
  },
  onLoad(){
    var wInfo = uni.getSystemInfoSync();
    this.svHeight = wInfo.windowHeight - 1;
    var group = uni.getStorageSync('group');
    if(group){
      this.dataList = group;
    }
    this.loadData();
  },
  methods:{
    loadData(){
      if (this.isLoading) return false;
      if (this.noMore) return false;
      uni.showLoading({
        title: '加载中',
      })
      this.isLoading = true;
      if(this.page==0){
        uni.showLoading({
          title: '加载中'
        })
      }
      this.page++;
      this.wjPost(this, 'getCategories', {
        page: this.page,
        rows: this.rows,
        taxonomy: 'group'
      }, (res)=>{
        this.isLoading = false;
        if(res.data.length<this.rows){
          this.noMore = true;
        }
        // 缓存数据
        if(this.page==1){
          uni.hideLoading();
          uni.setStorageSync('group', res.data);
          this.dataList = res.data;
        }else{
          this.dataList.push(...res.data);
        }
      })
    }
  }
}