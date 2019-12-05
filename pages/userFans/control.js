export default {
  data() {
		return {
      tabIndex: 0,
      rows: 10,
      page: 0,
      dataList: [],
      isLoading: false,
      noMore: false,
      svHeight: 0,
    }
  },
  onLoad(options){
    var wInfo = uni.getSystemInfoSync();
    this.svHeight = wInfo.windowHeight-1-wInfo.windowWidth/750*90;
    this.getList();
  },
  methods:{
    clickTabs(e){
      this.tabIndex = e;
      this.noMore = false;
      this.page = 0;
      this.dataList = [];
      this.getList();
    },
    getList(){
      if(this.isLoading) return;
      if(this.noMore) return;
      uni.showLoading({
        title: '加载中',
      })
      this.page++;
      this.isLoading = true;
      this.wjPost(this, 'getContacts', {
        type: this.tabIndex==0?'user':'fans',
        page: this.page,
        rows: this.rows,
      }, (res)=>{
        this.isLoading = false;
        uni.hideLoading();
        this.dataList.push(...res.data);
        if(res.data.length<this.rows){
          this.noMore = true;
        }
      })
    },
    doCollection(item, index){
      this.collection(item.user_id, 'user', (res)=>{
        if(res.success){
          if(res.data==2){
            item.collection_user = false;
          }else{
            item.collection_user = true;
          }
          this.$set(this.dataList, index, item);
        }
      })
    },
  }
}