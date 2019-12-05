export default {
  data() {
		return {
      ggbbClickIndex: 0,
      clickSound: null,
      bgSound: null,
      userInfo: {},
    }
  },
  onLoad(options){
    this.clickSound = uni.createInnerAudioContext();
    this.clickSound.src = this.WEBURL + '/wp-content/uploads/gardenGame/sound/click.mp3';
    // #ifndef H5
    this.bgSound = uni.getBackgroundAudioManager();
    this.bgSound.src = this.WEBURL + '/wp-content/uploads/gardenGame/sound/bgMusic.mp3';
    this.bgSound.onCanplay(()=>{
      this.bgSound.play();
    });
    // #endif
    this.userInfo = uni.getStorageSync('userInfo');
  },
  methods:{
    ggbbClick(e){
      console.log(this.clickSound);
      this.ggbbClickIndex = e;
      this.clickSound.play();
      setTimeout(()=>{
        this.ggbbClickIndex = 0;
      }, 200)
      if(e==2){
        this.wjRouterPush('userCoin')
      }else if(e==3){
        this.wjRouterPush('coinShop')
      }
    }
  }
}