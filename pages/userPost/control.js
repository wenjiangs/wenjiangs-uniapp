export default {
  data() {
		return {
      postStatus: [
        {label: 'publish', text: '已发布'},
        {label: 'pending', text: '待审核'},
        {label: 'draft', text: '草稿箱'},
        {label: 'trash', text: '回收站'}
      ],
      tabIndex: 0,
      posts: [],
      scrollViewHeight: 0,
      userInfo: null,
      isLoading: false,
      noMore: false,
      page: 0,
      rows: 20,
    }
  },
  onLoad(options){
    var windowObj = uni.getSystemInfoSync();
    this.windowWidth = windowObj.windowWidth;
    this.scrollViewHeight = windowObj.windowHeight - windowObj.windowWidth/750*90-1;
    this.userInfo = uni.getStorageSync('userInfo');
    this.getPostsByUser();
  },
  methods:{
    getPostsByUser(){
      if(this.isLoading) return;
      if(this.noMore) return;
      uni.showLoading({
        title: '加载中',
        mask: true
      })
      this.isLoading = true;
      this.page++;
      this.wjPost(this, 'getPosts', {
        page: this.page,
        rows: this.rows,
        userID: this.userInfo.ID,
        postStatus: this.postStatus[this.tabIndex].label,
      }, (res)=>{
        uni.hideLoading()
        this.posts.push(...res.data);
        if(res.data.length < this.rowsPost){
          this.noMore = true;
        }
        this.isLoading = false;
      })
    },
    clickTabs(e){
      this.tabIndex = e;
      this.page = 0;
      this.noMore = false;
      this.posts = [];
      this.getPostsByUser();
    }
  }
}