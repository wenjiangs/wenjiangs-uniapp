export default {
  data() {
		return {
      sVal: '',
      isLoading: false,
      rows: 10,
      page: 0,
      dataList: [],
      noMore: false,
      svHeight: 0,
    }
  },
  onLoad(options){
    var wInfo = uni.getSystemInfoSync();
    this.svHeight = wInfo.windowHeight - wInfo.windowHeight/750*104 - 1;
  },
  methods:{
    confirmSearch(){
      if(this.isEmpty(this.sVal)){
        uni.showToast({
          title: '搜索关键词不能为空',
          icon: 'none'
        })
        return;
      }
      this.page = 0;
      this.noMore = false;
      this.dataList = [],
      this.getSearch()
    },
    getSearch(){
      if(this.isLoading) return;
      if(this.noMore) return;
      console.log('开始加载');
      uni.showLoading({
        title: '加载中'
      })
      this.isLoading = true;
      this.page++;
      this.wjPost(this, 'getPosts', {
        page: this.page,
        rows: this.rows,
        s: this.sVal,
      }, (res)=>{
        uni.hideLoading()
        this.dataList.push(...res.data)
        if(res.data.length < this.rows){
          this.noMore = true;
        }
        this.isLoading = false;
      })
    },
  }
}