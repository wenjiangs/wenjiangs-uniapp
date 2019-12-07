import parse from 'mini-html-parser2';

export default {
  data() {
		return {
      rows: 10,
      page: 0,
      dataList: [],
      isLoading: false,
      noMore: false,
      msgType: '',
      svHeight: 0,
    }
  },
  onLoad(options){
    this.msgType = options.type;
    var wInfo = uni.getSystemInfoSync();
    this.svHeight = wInfo.windowHeight-1;
    this.getList();
    let titObj = {
      collection: '收藏消息',
      comment: '评论消息',
      system: '系统消息',
    }
    uni.setNavigationBarTitle({
      title: titObj[this.msgType]
    })
  },
  methods:{
    getList(){
      if(this.isLoading) return;
      if(this.noMore) return;
      uni.showLoading({
        title: '加载中',
      })
      this.page++;
      this.isLoading = true;
      this.wjPost(this, 'getSystemMessageByType', {
        type: this.msgType,
        page: this.page,
        rows: this.rows,
      }, (res)=>{
        this.isLoading = false;
        uni.hideLoading();
        
        let data = res.data;
        data.map((item, index)=>{
          if("comment" in item){
            parse(this.addClassToHtml(item.comment.comment_content), (err, nodes) => {
              if (!err) {
                data[index].comment.contentNodes = nodes;
              }
            })
          }
          if("reply" in item){
            parse(this.addClassToHtml(item.reply.comment_content), (err, nodes) => {
              if (!err) {
                data[index].reply.contentNodes = nodes;
              }
            })
          }
        })
        
        this.dataList.push(...res.data);
        if(res.data.length<this.rows){
          this.noMore = true;
        }
      })
    }
  }
}