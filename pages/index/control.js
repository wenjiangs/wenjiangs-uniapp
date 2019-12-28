export default {
  data() {
    return {
      bannerSwiperOpt: {
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 200,
        circular: true,
      },
      banner: {},
      bannerH: 0,
      bannerW: 0,
      category: [],
      isLoading: false,
      rows: 10,
      page: 0,
      catIndexID: '',
      dataList: [],
      noMore: false,
      svHeight: 0,
      sbHeight: 0,
      wInfo: {},
      tabTop: 500,
      sTop: 0,
      httWidth: 0,
      ttHeight: 0,
      searchWidth: 0,

      indexDocs: [],
      userInfo: {},

    }
  },
  onLoad(options) {

    // 初始化缓存
    var banner = this.wjGL('banner');
    if (banner) {
      this.banner = banner;
    } else {
      this.getBanner();
    }
    var category = this.wjGL('category');
    if (category) {
      this.category = category;
    } else {
      this.getCats();
    }
    var indexDocs = this.wjGL('indexDocs');
    if (indexDocs) {
      this.indexDocs = indexDocs;
    } else {
      this.getDocs();
    }

    this.getInitPost();

    var wInfo = uni.getSystemInfoSync();
    this.svHeight = wInfo.windowHeight;
    // 状态栏高度
    this.sbHeight = wInfo.statusBarHeight;
    this.ttHeight = this.sbHeight + 44;
    // #ifdef MP-ALIPAY
    this.ttHeight = 0;
    // #endif
    this.bannerW = wInfo.windowWidth;
    this.bannerH = wInfo.windowWidth / 640 * 280;
    // 胶囊按钮
    // #ifdef MP-WEIXIN
    var mbbd = wx.getMenuButtonBoundingClientRect()
    this.httWidth = mbbd.right - mbbd.width - wInfo.windowWidth / 750 * 50;
    // #endif
    // #ifndef MP-WEIXIN
    this.httWidth = wInfo.windowWidth - wInfo.windowWidth / 750 * 40;
    // #endif

    // 控制转发
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
      withShareTicket: true,
    })
    // #endif
    // 控制转发 end
    
    setTimeout(() => {
      this.caleTabTop();
    }, 500)
    
  },
  onShow() {
    let userInfo = uni.getStorageSync('userInfo');
    if (userInfo) {
      this.userInfo = userInfo;
    }
    // #ifdef H5 || APP-PLUS
    if (userInfo) {
      this.getUnreadNum();
    }
    // #endif
  },
  methods: {

    getInitPost() {
      var dataList = this.wjGL('indexPosts' + this.catIndexID);
      if (dataList) {
        this.dataList = dataList;
        this.page = 1;
      } else {
        this.loadData();
      }
    },

    getBanner() {
      this.wjPost(this, 'getBanner', {}, (res) => {
        if (res.success) {
          this.banner = res.data;
          this.wjSL('banner', this.banner);
        }
      })
    },
    getCats() {
      this.wjPost(this, 'getCategories', {}, (res) => {
        if (res.success) {
          var allPostCat = {
            "term_id": 0,
            "name": "全部"
          }
          this.category = [allPostCat, ...res.data];
          this.wjSL('category', this.category);
        }
      })
    },
    loadData() {
      if (this.isLoading) return;
      if (this.noMore) return;
      console.log('开始加载');
      uni.showLoading({
        title: '加载中'
      })
      this.isLoading = true;
      this.page++;
      this.wjPost(this, 'getPosts', {
        page: this.page,
        rows: this.rows,
        catID: this.catIndexID,
      }, (res) => {
        uni.hideLoading()
        if (this.page == 1) {
          this.wjSL('indexPosts' + this.catIndexID, res.data);
        }
        this.dataList.push(...res.data)
        if (res.data.length < this.rows) {
          this.noMore = true;
        }
        this.isLoading = false;
      })
    },
    clickTabs(e) {
      if (!(e == this.catIndexID)) {
        this.catIndexID = e;
        this.page = 0;
        this.dataList = [];
        this.noMore = false;
        // this.loadData();
        this.getInitPost();
      }
    },
    caleTabTop() {
      var query = wx.createSelectorQuery()
      query.select('#tabBox').boundingClientRect()
      query.exec((res) => {
        this.tabTop = res[0].top;
      })
    },
    onPageScrollS(e) {
      this.sTop = e.detail.scrollTop + this.ttHeight;
    },
    doScan() {
      console.log('开始扫码');
      // #ifndef H5
      uni.scanCode({
        onlyFromCamera: true,
        scanType: ['qrCode'],
        success: (res) => {
          console.log('条码内容：' + res.result);
          if (this.isJSON(res.result)) {
            var data = JSON.parse(res.result);
            if (data.type && data.type == 'scaningLogin') {
              var userInfo = uni.getStorageInfoSync('userInfo');
              console.log('userInfo', userInfo);
              if (this.isEmpty(userInfo)) {
                this.wjRouterPush('login');
              } else {
                this.wjRouterPush({
                  path: 'scanConfirmLogin',
                  query: {
                    uuid: data.content
                  }
                });
              }
            } else {
              uni.setStorageSync('scanData', data);
              this.wjRouterPush('scanResult');
            }
          } else {
            uni.setStorageSync('scanData', res.result);
            this.wjRouterPush('scanResult');
          }
        }
      });
      // #endif
    },

    getDocs() {
      this.wjPost(this, 'getCategories', {
        page: 1,
        rows: 10,
        taxonomy: 'docs'
      }, (res) => {
        this.indexDocs = res.data;
        this.wjSL('indexDocs', this.indexDocs);
      })
    }
  },
  onShareAppMessage() {
    return {
      title: '文江博客',
      path: '/pages/index/view',
      imageUrl: 'http://www.wenjiangs.com/wp-content/uploads/2019/08/2.jpg',
      entryDataHash: 'wenjiangs'
    }
  }
}
