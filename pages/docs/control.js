import { mapState } from 'vuex'

export default {
  data() {
		return {
      isLoading: false,
      dataList: [],
      page: 0,
      rows: 10,
      svHeight: 0,
    }
  },
  onLoad(options){
    var wInfo = uni.getSystemInfoSync();
    this.svHeight = wInfo.windowHeight - 1;
    var docs = this.wjGL('docs');
    if(docs){
      this.dataList = docs;
      this.page = 1;
    }else{
      this.loadData();
    }
  },
  onShow(){
  },
  methods:{
    loadData(){
      if (this.isLoading) return;
      this.isLoading = true;
      this.page++;
      uni.showLoading({
        title: '加载中',
      })
      this.wjPost(this, 'getCategories', {
        page: this.page,
        rows: 10,
        taxonomy: 'docs'
      }, (res)=>{
        this.isLoading = false;
        uni.hideLoading();
        // 缓存数据
        if (res.success){
          if(this.page==1){
            this.wjSL('docs', res.data)
          }
          this.dataList.push(...res.data);
        }
      })
    }
  },
  computed:{
    ...mapState([
      'options'
    ])
  }
}