import verify from '@/common/js/verify.js';
export default {
  data() {
		return {
      user_login: '',
      user_email: '',
      user_password: '',
    }
  },
  onLoad(options){
    
  },
  methods:{
    checkForm(){
      var verifyCon = [
        ['n', 'isEmpty', this.user_login, '请输入登录账号'],
        ['n', 'scope', this.user_login, '登录账号长度6-18', 6, 18],
        ['n', 'isEmpty', this.user_email, '请输入邮箱地址'],
        ['n', 'CheckEmail', this.user_email, '邮箱地址不正确'],
        ['p', 'isEmpty', this.user_password, '请输入登录密码'],
        ['p', 'scope', this.user_password, '登录密码长度6-18', 6, 18],
      ];
      
      var verifyRes = verify(verifyCon, true)
      if(verifyRes){
        uni.showToast({
        	title: verifyRes[3],
          icon: "none"
        })
        return false;
      }
      this.register();
    },
    register(){
      uni.showLoading({
      	title: "注册中"
      })
      this.wjPost(this, 'register', {
        user_login: this.user_login,
        user_email: this.user_login,
        user_password: this.user_password,
      }, (res)=>{
        uni.hideLoading()
        uni.showToast({
        	title: res.message,
          icon: "none"
        })
        if(res.success){
          setTimeout(()=>{
            uni.setStorageSync('userInfo', res.data);
            uni.reLaunch({
              url: 'pages/ucenter/view',
            })
          }, 1500)
        }
      })
    }
  }
}