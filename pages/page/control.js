import parse from 'mini-html-parser2';

export default {
  data() {
		return {
      pages: [],
      tabIndex: 0,
      content: '',
      pageID: 0,
      contentNodes: null,
    }
  },
  onLoad(options){
    this.pageID = options.id;
    var pages = uni.getStorageSync('singlePages');
    if(pages){
      this.pages = pages;
      this.beforeShow();
    }else{
      this.getPages();
    }
  },
  methods:{
    getPages(){
      uni.showLoading({
      	title: '加载中'
      })
      this.wjPost(this, 'getPages', {}, (res)=>{
        uni.hideLoading();
        this.pages = res.data;
        uni.setStorageSync('singlePages', this.pages);
        this.beforeShow();
      })
    },
    // 遍历数组取出文章内容
    beforeShow(){
      for(let i=0; i<this.pages.length; i++){
        if(this.pages[i].ID == this.pageID){
          uni.setNavigationBarTitle({ title: this.pages[i].title })
          this.content = this.addClassToHtml(this.pages[i].content);
          parse(this.content, (err, nodes) => {
            if (!err) {
              this.contentNodes = nodes;
            }
          })
          break;
        }
      }
    }
  }
}