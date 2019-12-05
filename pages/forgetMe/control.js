import verify from '@/common/js/verify.js';
export default {
  data() {
		return {
      user_login: '',
      user_code: '',
      email_code: '',
      new_password: '',
      jsGuidCur: '',
      imgCodeUrl: '',
      
      isSending: false,
      sendTxt: '发送验证码',
      timeObj: null,
      timeOut: 60,
      
      isSubmiting: false,
      
    }
  },
  onLoad(options){
    this.reLoadImgCode();
  },
  methods:{
    beforeSend(){
      if(this.isSending) return;
      var verifyCon = [
        ['n', 'isEmpty', this.user_login, '请输入用户名/邮箱地址/手机号'],
        ['n', 'isEmpty', this.user_code, '请输入图形验证码'],
      ];
      var verifyRes = verify(verifyCon, true)
      if(verifyRes){
        uni.showToast({
        	title: verifyRes[3],
          icon: "none"
        })
        return false;
      }
      this.isSending = true;
      this.sendMailCode();
    },
    sendMailCode(){
      uni.showLoading({
        title: '发送中',
      })
      // 倒计时
      this.timeObj = setInterval(()=>{
        this.timeOut--;
        this.sendTxt = this.timeOut + 'S后可重发';
        if(this.timeOut == 0){
          this.sendTxt = '发送验证码';
          this.timeOut = 60;
          this.isSending = false;
          clearInterval(this.timeObj);
        }
      }, 1000)
      this.wjPost(this, 'sendEmailCodeByUser', {
        user_code: this.user_code,
        user_login: this.user_login,
        jsGuid: this.jsGuidCur
      }, (res)=>{
        uni.hideLoading();
        uni.showToast({
          title: res.message,
          icon: 'none',
        })
      });
    },
    checkForm(){
      if(this.isSubmiting) return;
      var verifyCon = [
        ['n', 'isEmpty', this.user_login, '请输入用户名/邮箱地址/手机号'],
        ['n', 'isEmpty', this.user_code, '请输入图形验证码'],
        ['n', 'isEmpty', this.email_code, '请输入邮箱验证码'],
        ['n', 'isEmpty', this.new_password, '请输入新密码'],
      ];
      var verifyRes = verify(verifyCon, true)
      if(verifyRes){
        uni.showToast({
        	title: verifyRes[3],
          icon: "none"
        })
        return false;
      }
      this.isSubmiting = true;
      this.submitForm();
    },
    submitForm(){
      uni.showLoading({
        title: '提交中',
      })
      this.wjPost(this, 'forgetVerification', {
        user_code: this.user_code,
        user_login: this.user_login,
        email_code: this.email_code,
        new_password: this.new_password,
        jsGuid: this.jsGuidCur
      }, (res)=>{
        uni.hideLoading();
        uni.showToast({
          title: res.message,
          icon: 'none',
        })
        if(res.success){
          setTimeout(()=>{
            uni.navigateBack({
              delta: 1,
            })
          }, 1500)
        }
      })
    },
    reLoadImgCode(){
      this.jsGuidCur = this.jsGuid();
      uni.setStorageSync('jsGuid', this.jsGuidCur);
      this.imgCodeUrl = this.APIURL + 'verification.php?jsGuid=' + this.jsGuidCur;
    }
  },
  onHide(){
    // 离开页面直接清除定时器
    clearInterval(this.timeObj);
  }
}