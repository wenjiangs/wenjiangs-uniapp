export default {
  data() {
    return {
      userInfo: {},
      signDate: [],
      userSignInfo: {}
    }
  },
  onLoad(options) {
    this.userInfo = uni.getStorageSync('userInfo');
    this.getUserSignInfo(() => {
      this.getSignData();
    });
  },
  methods: {
    // 获取签到时间数组
    getSignData() {
      let mDate = new Date;
      let signVal = this.userSignInfo.already_sign_day + 1;
      if (signVal > 6) signVal = 10;
      this.signDate.push({
        time: this.formatDate(mDate),
        is_sign: this.userSignInfo.today_sign,
        sign_val: '+' + signVal,
      })
      for (let i = 0; i < 6; i++) {
        signVal++;
        if (signVal > 6) signVal = 10;
        mDate.setDate(mDate.getDate() + 1);
        this.signDate.push({
          time: this.formatDate(mDate),
          is_sign: false,
          sign_val: '+' + signVal,
        })
      }
    },
    formatDate(mDate) {
      let m = mDate.getMonth() + 1;
      let d = mDate.getDate();
      return m + '.' + d
    },
    getUserSignInfo(cb) {
      this.wjPost(this, 'getUserSignInfo', {}, (res) => {
        this.userSignInfo = res.data;
        cb();
      })
    },
    userSign(item, index) {
      if (index > 0) return; // 非今天
      if(item.is_sign) return; // 已签到
      uni.showLoading({
        title: '签到中'
      })
      this.wjPost(this, 'userSign', {}, (res) => {
        uni.hideLoading()
        uni.showToast({
          title: res.message,
          icon: 'none'
        })
        if(res.success){
          item.is_sign = true;
          this.$set(this.signDate, index, item);
        }
      })
    }
  }
}
