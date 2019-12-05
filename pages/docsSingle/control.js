import parse from 'mini-html-parser2';

export default {
  data() {
		return {
      docsID: 0,
      docsSingle: [],
      cType: 1,
      
      postPage: 0,
      isPostLoading: false,
      noPostMore: false,
      post: [],
      
      commentPage: 0,
      isCommentLoading: false,
      noCommentMore: false,
      comment: [],

      rows: 10,
      svHeight: 0,
      userInfo: {
        ID: 0,
      },
      tabTop: 0,
      sTop: 0,
      
      comment_parent: 0,
      plaText: '请输入您的评论',
      newCommentContent: '',
      showMask: false,
      showCF: false,
      
      collectionText: '收藏',
      
    }
  },
  onShow(){
    setTimeout(()=>{
      this.caleTabTop();
    }, 500)
  },
  onLoad(options){
    this.userInfo = uni.getStorageSync('userInfo');
    this.docsID = options.id;
    var wInfo = uni.getSystemInfoSync();
    this.svHeight = wInfo.windowHeight - wInfo.windowWidth/750*88;
    this.loadData();
    this.getDocsPost();
    this.getCategoryComment();
  },
  methods:{
    loadData(){
      uni.showLoading({
      	title: '加载中'
      })
      this.wjPost(this, 'getCategory', {
        catID: this.docsID,
        taxonomy: 'docs',
      }, (res)=>{
        uni.hideLoading();
        if(res.success){
          this.docsSingle = res.data;
          
          // 是否收藏
          if(this.docsSingle.collection_current){
            this.collectionText = '已收藏';
          }
          
          parse(this.addClassToHtml(this.docsSingle.details), (err, nodes) => {
            if (!err) {
              this.docsSingle.contentNodes = nodes;
            }
          })
        }
      })
    },
    clickTabs(e){
      this.cType = e;
    },
    getDocsPost(){
      if(this.isPostLoading) return;
      if(this.noPostMore) return;
      this.isPostLoading = true;
      this.postPage++;
      this.wjPost(this, 'getPosts', {
        page: this.postPage,
        rows: this.rows*2,
        catID: this.docsID,
        postType: 'doc',
        taxonomy: 'docs',
      }, (res)=>{
        this.isPostLoading = false;
        this.post.push(...res.data);
        if(res.data.length<this.rows*2){
          this.noPostMore = true;
        }
      })
    },
    getCategoryComment(){
      if(this.isCommentLoading) return;
      if(this.noCommentMore) return;
      this.isCommentLoading = true;
      this.commentPage++;
      this.wjPost(this, 'getCategoryComment', {
        page: this.commentPage,
        rows: this.rows,
        catID: this.docsID
      }, (res)=>{
        if(res.success){
          this.isCommentLoading = false;
          this.comment.push(...res.data);
          for(let i=0; i<this.comment.length; i++){
            parse(this.addClassToHtml(this.comment[i].content), (err, nodes) => {
              if (!err) {
                this.comment[i].contentNodes = nodes;
              }
            })
            this.comment[i].comment_date = this.comment[i].publish_date;
          }
          if(res.data.length < this.rows){
            this.noCommentMore = true;
          }
        }
      })
    },
    loadMore(){
      console.log('开始加载');
      if(this.cType == 2){
        this.getDocsPost()
      }else if(this.cType == 3){
        this.getCategoryComment()
      }
    },
    caleTabTop(){
      var query = wx.createSelectorQuery()
      query.select('#tabAffix').boundingClientRect()
      query.exec((res)=>{
        this.tabTop = res[0].top;
      })
    },
    onPageScrollS(e){
      this.sTop = e.detail.scrollTop
    },
    showCommentForm(){
      if(this.userInfo){
        this.showCF = true;
        this.showMask = true;
      }else{
        uni.showToast({
          title: '请先登录',
          icon: 'none',
        })
      }
    },
    hidePopup(){
      this.showCF = false;
      this.showMask = false;
    },
    checkComment(e){
      console.log(this.newCommentContent);
      if (this.newCommentContent==''){
        uni.showToast({
          title: '评论不能为空',
          icon: 'none'
        })
        return false;
      }
      this.submitComment();
    },
    submitComment(){
      uni.showLoading({
        title: '提交中',
      })
      this.wjPost(this, 'postCategoryComment', {
        user_id: this.userInfo.ID,
        token: this.userInfo.token,
        content: this.newCommentContent,
        term_id: this.docsID,
        parent_id: this.comment_parent,
      }, (res)=>{
        uni.hideLoading();
        uni.showToast({
          title: res.message,
          icon: 'none',
        })
        if (res.success){
          this.docsSingle.comment_count++;
          
          parse(this.addClassToHtml(res.data.content), (err, nodes) => {
            if (!err) {
              res.data.contentNodes = nodes;
            }
          })
          res.data.comment_date = res.data.publish_date;
          
          this.comment = [res.data, ...this.comment];
          this.showCF = false;
          this.showMask = false;
          this.newCommentContent = '';
        }
      })
    },
    doCategoryCollection(){
      this.collection(this.docsID, 'docs', (res)=>{
        if (res.success) {
          if (res.data == 1) {
            this.docsSingle.collection++;
            this.collectionText = '已收藏';
          } else if (res.data == 2) {
            this.docsSingle.collection--;
            this.collectionText = '收藏';
          }
        }
      })
    },
  }
}