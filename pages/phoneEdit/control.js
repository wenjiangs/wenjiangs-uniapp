import verify from '@/common/js/verify.js';
export default {
  data() {
		return {
      mobile_phone: '',
      sms_code: '',
      mobile_phone2: '',
      isSubmiting: false,
      isSending: false,
      userInfo: null,
      timeObj: null,
      btnText: '发送验证码',
      timeOut: 60,
      plaText: '当前手机号',
      titleText: '修改手机号',
      tabIndex: 1,
    }
  },
  onLoad(options){
    this.userInfo = uni.getStorageSync('userInfo');
    if(this.isEmpty(this.userInfo.mobile_phone)){
      this.titleText = '绑定手机号';
      uni.setNavigationBarTitle({
        title: this.titleText
      })
      this.plaText = '手机号';
    }
  },
  methods:{
    beforeSendSms(){
      if(this.isSending) return;
      var verifyCon = [
        ['n', 'isEmpty', this.mobile_phone, '请输入当前手机号'],
        ['n', 'CheckMoble', this.mobile_phone, '手机号格式不正确']
      ];
      
      if(!this.isEmpty(this.userInfo.mobile_phone)){
        verifyCon.push(['n', 'trueFalse', this.mobile_phone==this.userInfo.mobile_phone, '当前手机号不正确']);
      }
      
      var verifyRes = verify(verifyCon, true)
      if(verifyRes){
        uni.showToast({
        	title: verifyRes[3],
          icon: "none"
        })
        return false;
      }
      this.sendSms();
    },
    sendSms(){
      // 倒计时
      this.isSending = true;
      this.timeObj = setInterval(()=>{
        this.timeOut--;
        this.btnText = this.timeOut + 'S后可重发';
        if(this.timeOut==0){
          this.timeOut = 60;
          this.btnText = '发送验证码';
          this.isSending = false;
          clearInterval(this.timeObj)
        }
      }, 1000)
      this.wjPost(this, 'sendSmsCode', {
        mobile_phone: this.mobile_phone
      }, (res)=>{
        uni.showToast({
          title: res.message,
          icon: 'none'
        })
      })
    },
    checkForm(){
      if(this.isSubmiting) return;
      var verifyCon = [
        ['p', 'isEmpty', this.mobile_phone, '请输入当前手机号'],
        ['n', 'CheckMoble', this.mobile_phone, '手机号格式不正确'],
        ['p', 'isEmpty', this.sms_code, '请输入验证码'],
      ];
      
      if(!this.isEmpty(this.userInfo.mobile_phone)){
        verifyCon.push(['n', 'trueFalse', this.mobile_phone==this.userInfo.mobile_phone, '当前手机号不正确']);
        verifyCon.push(['p', 'isEmpty', this.mobile_phone2, '请输入新的手机号']);
        verifyCon.push(['p', 'CheckMoble', this.mobile_phone2, '新的手机号格式不正确']);
      }
      
      var verifyRes = verify(verifyCon, true)
      if(verifyRes){
        uni.showToast({
        	title: verifyRes[3],
          icon: "none"
        })
        return false;
      }
      this.submitForm();
    },
    submitForm(){
      this.isSubmiting = true;
      uni.showLoading({
        title: '修改中'
      })
      var params = {
        meta_name: 'mobile_phone',
        meta_value: this.mobile_phone2,
        sms_code: this.sms_code,
      };
      
      if(this.isEmpty(this.userInfo.mobile_phone)){
        params.meta_value = this.mobile_phone;
      }
      
      this.wjPost(this, 'updateUserMeta', params, (res)=>{
        this.isSubmiting = false;
        uni.showToast({
          title: res.message,
          icon: 'none'
        })
        if(res.success){
          if(this.isEmpty(this.userInfo.mobile_phone)){
            this.userInfo.mobile_phone = this.mobile_phone;
          }else{
            this.userInfo.mobile_phone = this.mobile_phone2;
          }
          uni.setStorageSync('userInfo', this.userInfo);
          setTimeout((res)=>{
            uni.navigateBack({
              delta: 1
            })
          }, 1500)
        }
      })
    },
    bindUserPhone(){
      
    }
  }
}