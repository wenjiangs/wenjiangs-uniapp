export default {
  data() {
    return {
      author: {
        user_avatar: '',
      },
      author_id: 0,
      locationVal: '',
    }
  },
  onLoad(options) {
    this.author_id = options.id;
    uni.showLoading({
      title: '加载中',
    })
    this.getUser(this, this.author_id, (res)=>{
      uni.hideLoading()
      this.author = res.data;
    }, false)
  },
  methods: {
    
  }
}