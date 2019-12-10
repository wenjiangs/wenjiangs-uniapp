<script>
  import pageAnimation from './components/page-animation'
	export default {
    mixins: [pageAnimation],
		onLaunch: function () {
			console.log('App Launch')
      // #ifdef H5
      // 让元素滚动到当前可视区域
      window.addEventListener('resize', () => {
        const activeElement = document.activeElement
        if (activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA') {
          setTimeout(() => {
            activeElement.scrollIntoView()
          }, 100)
        }
      })
      
      // 微信 6.7.4 更新以后导致 Input 文本框失去焦点，IOS 软键盘缩回去页面没有缩回去
      // http://www.wenjiangs.com/article/weixin-6-7-4-input-ios-blur.html
      wx.onWindowResize((res)=>{
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
      })

      this.getSetting((res)=>{
        var wxjssdk = res.data.wxjssdk;
        this.jweixin.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，
          //若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: wxjssdk.appId, // 必填，公众号的唯一标识
          timestamp: wxjssdk.timestamp, // 必填，生成签名的时间戳
          nonceStr: wxjssdk.nonceStr, // 必填，生成签名的随机串
          signature: wxjssdk.signature,// 必填，签名
          jsApiList: ['chooseWXPay', 'previewImage',
          'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ']
        });
      });
      // #endif
      
      this.getOptions((res)=>{
        this.$store.commit('setOptions', res.data);
      })
      
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
	}
</script>

<style>
@import url("common/css/iconfont.css");
@import url("common/css/style.css");
</style>
