import parse from 'mini-html-parser2';

export default {
  data() {
    return {
      post: {
        collection: 0,
        word_count: 0,
        views: 0
      },
      comment: [],
      windowWidth: 0,
      scrollViewHeight: 0,
      pageNum: 0,
      postID: 0,
      noMore: false,
      newCommentContent: '',
      userInfo: {},
      isLogin: false,
      showMask: false,
      showCF: false,
      postType: 'post',
      collectionText: '收藏',
      relevantPosts: [],
      comment_parent: 0,
      plaText: '请输入您的评论',
      isLoading: false,
    }
  },
  onLoad(options) {
    var windowObj = uni.getSystemInfoSync();
    this.windowWidth = windowObj.windowWidth;
    this.scrollViewHeight = windowObj.windowHeight;

    this.userInfo = uni.getStorageSync('userInfo');
    if (this.userInfo) {
      this.isLogin = true;
    }

    this.postID = options.id;
    this.scrollViewHeight = this.scrollViewHeight - this.windowWidth / 750 * 100

    if (options.type) {
      this.postType = options.type;
    }

    this.get_post((res) => {
      this.calcCollection();
    });
    this.get_rec();
    this.get_comment();
  },
  methods: {
    get_post(cb) {
      uni.showLoading({
        title: '加载中',
      })
      this.wjPost(this, 'getPost', {
        postID: this.postID,
        userID: this.userInfo.ID,
        postType: this.postType,
      }, (res) => {
        parse(this.addClassToHtml(res.data.content), (err, nodes) => {
          if (!err) {
            res.data.contentNodes = nodes;
            this.post = res.data;
          }
        })
        uni.hideLoading()
        cb(res);
      })
    },

    get_rec() {
      this.wjPost(this, 'getRelevantPosts', {}, (res) => {
        this.relevantPosts = res.data;
      })
    },

    get_comment() {
      if (this.isLoading) return;
      if (this.noMore) return false;
      this.pageNum++
      this.wjPost(this, 'getComments', {
        postID: this.postID,
        userID: this.userID,
        page: this.pageNum,
      }, (res) => {
        this.comment.push(...res.data)
        for (let i = 0; i < this.comment.length; i++) {
          parse(this.addClassToHtml(this.comment[i].comment_content), (err, nodes) => {
            if (!err) {
              this.comment[i].contentNodes = nodes;
            }
          })
        }
        if (res.data.length < 10) {
          this.noMore = true;
        }
      })
    },
    showCommentForm() {
      if (this.userInfo) {
        this.showCF = true;
        this.showMask = true;
      } else {
        uni.showToast({
          title: '请先登录',
          icon: 'none',
        })
      }
    },
    hidePopup() {
      this.showCF = false;
      this.showMask = false;
    },
    checkComment(e) {
      console.log(this.newCommentContent);
      if (this.newCommentContent == '') {
        uni.showToast({
          title: '评论不能为空',
          icon: 'none'
        })
        return false;
      }
      this.submitComment();
    },
    submitComment() {
      uni.showLoading({
        title: '提交中',
      })
      this.wjPost(this, 'postComment', {
        comment_author_email: this.userInfo.user_email,
        comment_author: this.userInfo.display_name,
        comment_content: this.newCommentContent,
        comment_post_ID: this.postID,
        comment_parent: this.comment_parent,
        post_type: this.postType
      }, (res) => {
        uni.hideLoading();
        uni.showToast({
          title: res.message,
          icon: 'none',
        })
        if (res.success) {
          this.post.comment_count++;
          this.comment = [res.data, ...this.comment];
          this.showCF = false;
          this.showMask = false;
          this.newCommentContent = '';
        }
      })
    },
    sharePost() {
      // uni.showToast({
      //   title: '开发中',
      //   icon: 'none'
      // })
      // #ifdef H5
      console.log('网页分享');
      if (navigator.share) {
        navigator.share({
          title: 'WebShare API Demo',
          url: 'https://codepen.io/ayoisaiah/pen/YbNazJ',
          text: '我正在看《Web Share API》'
        }).then(() => {
          uni.showToast({
            title: '感谢分享',
            icon: 'none'
          })
        }).catch(() => {
          uni.showToast({
            title: '用户取消分享',
            icon: 'none'
          })
        })
      } else {
        // 不支持
        console.log('浏览器不支持');
      }
      // #endif
    },
    doPostCollection() {
      this.collection(this.postID, 'post', (res) => {
        if (res.success) {
          if (res.data == 1) {
            this.post.collection++;
            this.collectionText = '已收藏';
          } else if (res.data == 2) {
            this.post.collection--;
            this.collectionText = '收藏';
          }
        }
      })
    },
    doUserCollection() {
      this.collection(this.post.post_author, 'user', (res) => {
        if (res.success) {
          if (res.data == 1) {
            this.post.collection_author = true;
          } else {
            this.post.collection_author = false;
          }
        }
      });
    },
    calcCollection() {
      if (!this.userInfo) {
        return false;
      }
      if (this.post.collection_current) {
        this.collectionText = '已收藏';
      }
    },
    toTrash() {
      uni.showLoading({
        title: '删除中',
      })
      this.wjPost(this, 'changePostStatus', {
        user_id: this.userInfo.ID,
        token: this.userInfo.token,
        post_id: this.postID,
        post_status: "trash"
      }, (res) => {
        uni.hideLoading();
        uni.showToast({
          title: res.data.message,
          icon: 'none',
        })
        if (res.data.success) {
          uni.navigateBack({
            delta: 1
          })
        }
      })
    },
    navigate(e) {
      console.log(e);
    },
    reply(e) {
      this.comment_parent = e.comment_ID;
      this.plaText = '回复 ' + e.comment_author;
      this.showCommentForm();
    },

    toAuthor() {
      // #ifdef H5 || APP-PLUS
      this.wjRouterPush({
        path: 'author',
        query: {
          id: this.post.post_author
        }
      });
      // #endif
    }
  }
}
