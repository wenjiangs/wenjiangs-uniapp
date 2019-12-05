export default {
  data() {
		return {
      scanData: '',
    }
  },
  onLoad(options){
    var scanData = uni.getStorageSync('scanData');
    if(scanData){
      this.scanData = scanData;
    }else{
      this.wjRouterPush('/');
    }
  },
  methods:{
    setClipboard(){
      uni.setClipboardData({
        data: this.scanData
      })
    }
  }
}