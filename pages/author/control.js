import parse from 'mini-html-parser2';

export default {
  data() {
		return {
      author: {
        user_avatar: '',
      },
      author_id: 0,
      showMore: false,
      dataType: 1,

      isLoadingPost: false,
      rowsPost: 10,
      pagePost: 0,
      noMorePost: false,
      posts: [],

      isLoadingComment: false,
      rowsComment: 10,
      pageComment: 0,
      noMoreComment: false,
      comments: [],

      isLoadingDocs: false,
      rowsDocs: 10,
      pageDocs: 0,
      noMoreDocs: false,
      docs: [],

      isLoadingTopic: false,
      rowsTopic: 10,
      pageTopic: 0,
      noMoreTopic: false,
      topics: [],

      isLoadingReply: false,
      rowsReply: 10,
      pageReply: 0,
      noMoreReply: false,
      replys: [],
      
      beforeTop: 0,
      sTop: 0,
    }
  },
  onLoad(options){
    var wInfo = uni.getSystemInfoSync();
    this.author_id = options.id;
    
    // 计算tabs离顶部的高度
    this.beforeTop = wInfo.windowWidth/750*472+1;
    
    this.getUser(this, options.id, (res)=>{
      console.log(res);
      this.author = res.data;
    }, false)
    this.loadData();
  },
  methods:{
    doCollection(){
      this.collection(this.author_id, 'user', (res)=>{
        if(res.success){
          if(res.data==2){
            this.author.collection_user = false;
          }else{
            this.author.collection_user = true;
          }
        }
      })
    },
    getPostsByUser(){
      if(this.isLoadingPost) return;
      if(this.noMorePost) return;
      uni.showLoading({
        title: '加载中',
        mask: true
      })
      this.isLoadingPost = true;
      this.pagePost++;
      this.wjPost(this, 'getPosts', {
        page: this.pagePost,
        rows: this.rowsPost,
        userID: this.author_id,
      }, (res)=>{
        uni.hideLoading()
        this.posts.push(...res.data);
        if(res.data.length < this.rowsPost){
          this.noMorePost = true;
        }
        this.isLoadingPost = false;
      })
    },
    getCommentByUser(){
      if(this.isLoadingComment) return;
      if(this.noMoreComment) return;
      this.isLoadingComment = true;
      this.pageComment++;
      uni.showLoading({
        title: '加载中',
        mask: true,
      })
      this.wjPost(this, 'userComments', {
        page: this.pageComment,
        rows: this.rowsComment,
        userID: this.author_id,
        post_type: 'post',
        dataType: 1
      }, (res)=>{
        uni.hideLoading()
        
        res.data.map((item, index)=>{
          parse(this.addClassToHtml(item.comment_content), (err, nodes) => {
            if (!err) {
              res.data[index].contentNodes = nodes;
            }
          })
        })
        
        this.comments.push(...res.data);
        console.log(this.comments);
        if(res.data.length < this.rowsComment){
          this.noMoreComment = true;
        }
        this.isLoadingComment = false;
      })
    },
    getDocsByUser(){
      if (this.isLoadingDocs) return false;
      if (this.noMoreDocs) return false;
      this.isLoadingDocs = true;
      uni.showLoading({
        title: '加载中',
        mask: true
      })
      this.pageDocs++;
      this.wjPost(this, 'getCategories', {
        page: this.pageDocs,
        rows: this.rowsDocs,
        taxonomy: 'docs',
        userID: this.author_id,
      }, (res)=>{
        uni.hideLoading()
        this.isLoadingDocs = false;
        if(res.data.length < this.rowsDocs){
          this.noMoreDocs = true;
        }
        if (res.success){
          this.docs.push(...res.data);
        }
      })
    },
    getTopicByUser(){
      if (this.isLoadingTopic) return false;
      this.isLoadingTopic = true;
      uni.showLoading({
        title: '加载中',
        mask: true
      })
      this.pageTopic++
      this.wjPost(this, 'getPosts', {
        page: this.pageTopic,
        rows: this.rowsTopic,
        postType: 'topic',
        taxonomy: 'group',
        userID: this.author_id,
        sp: 1,
      }, (res)=>{
        uni.hideLoading()
        this.isLoadingTopic = false;
        if(res.data.length < this.rowsTopic){
          this.noMoreTopic = true;
        }
        if(res.success){
          this.topics.push(...res.data);
        }
      })
    },
    getReplyByUser(){
      if(this.isLoadingReply) return;
      if(this.noMoreReply) return;
      this.isLoadingReply = true;
      this.pageReply++;
      uni.showLoading({
        title: '加载中',
        mask: true,
      })
      this.wjPost(this, 'userComments', {
        page: this.pageReply,
        rows: this.rowsReply,
        userID: this.author_id,
        post_type: 'topic',
        dataType: 1
      }, (res)=>{
        uni.hideLoading()
        
        res.data.map((item, index)=>{
          parse(this.addClassToHtml(item.comment_content), (err, nodes) => {
            if (!err) {
              res.data[index].contentNodes = nodes;
            }
          })
        })
        
        this.replys.push(...res.data);
        if(res.data.length < this.rowsReply){
          this.noMoreReply = true;
        }
        this.isLoadingReply = false;
      })
    },
    loadData(){
      if(this.dataType==1){
        this.getPostsByUser();
      }else if(this.dataType==2){
        this.getCommentByUser();
      }else if(this.dataType==3){
        this.getDocsByUser()
      }else if(this.dataType==4){
        this.getTopicByUser()
      }else if(this.dataType==5){
        this.getReplyByUser()
        console.log('replys');
      }
    },
    isShowMore(){
      this.showMore = !this.showMore;
    },
    hideShowMore(){
      this.showMore = false;
    },
    tabClick(e){
      this.dataType = e;
      this.loadData();
    }
  },
  onPageScroll(e){
    this.sTop = e.scrollTop;
  },
  onReachBottom(){
    this.loadData();
  }
}