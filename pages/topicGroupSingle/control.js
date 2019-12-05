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
      catID: 0,
      userInfo: {
        ID: 0,
      },
      group: {},
    }
  },
  onLoad(options){
    this.catID = options.id;
    var userInfo = uni.getStorageSync('userInfo');
    if(userInfo){
      this.userInfo = userInfo;
    }
    var wInfo = uni.getSystemInfoSync();
    this.svHeight = wInfo.windowHeight;
    this.loadData();
    this.getCategory();
  },
  methods:{
    loadData(){
      console.log('开始加载');
      uni.showLoading({
        title: '加载中',
      })
      if (this.isLoading) return false;
      this.isLoading = true;
      this.page++
      this.wjPost(this, 'getPosts', {
        page: this.page,
        rows: this.rows,
        postType: 'topic',
        taxonomy: 'group',
        catID: this.catID,
        sp: 1,
      }, (res)=>{
        uni.hideLoading()
        this.isLoading = false;
        if(res.data.length<this.rows){
          this.noMore = true;
        }
        if(res.success){
          this.dataList.push(...res.data);
        }
      })
    },
    getCategory(){
      this.wjPost(this, 'getCategory', {
        catID: this.catID,
        taxonomy: 'group'
      }, (res)=>{
        this.group = res.data;
        uni.setNavigationBarTitle({
          title: this.group.name,
        })
      })
    }
  }
}