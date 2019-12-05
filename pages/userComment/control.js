import parse from 'mini-html-parser2';

export default {
  data() {
		return {
      commentType: ['我发布的评论', '别人给我的评论'],
      tabIndex: 0,
      scrollViewHeight: 0,
      userInfo: null,
      isLoading: false,
      noMore: false,
      page: 0,
      rows: 20,
      comments: [],
    }
  },
  onLoad(options){
    var windowObj = uni.getSystemInfoSync();
    this.windowWidth = windowObj.windowWidth;
    this.scrollViewHeight = windowObj.windowHeight - windowObj.windowWidth/750*90 - 1;
    this.userInfo = uni.getStorageSync('userInfo');
    this.getCommentByUser();
  },
  methods:{
    getCommentByUser(){
      if(this.isLoading) return;
      if(this.noMore) return;
      this.isLoading = true;
      this.page++;
      uni.showLoading({
        title: '加载中',
        mask: true,
      })
      this.wjPost(this, 'userComments', {
        page: this.page,
        rows: this.rows,
        userID: this.userInfo.ID,
        post_type: 'post',
        dataType: this.tabIndex+1
      }, (res)=>{
        uni.hideLoading()
        this.comments.push(...res.data);
        
        for(let i=0; i<this.comments.length; i++){
          parse(this.addClassToHtml(this.comments[i].comment_content), (err, nodes) => {
            if (!err) {
              this.comments[i].contentNodes = nodes;
            }
          })
        }
        
        if(res.data.length < this.rows){
          this.noMore = true;
        }
        this.isLoading = false;
      })
    },
    clickTabs(e){
      this.tabIndex = e;
      this.page = 0;
      this.noMore = false;
      this.comments = [];
      this.getCommentByUser();
    }
  }
}