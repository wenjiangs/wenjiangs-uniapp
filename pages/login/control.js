import verify from '@/common/js/verify.js';
export default {
  data() {
		return {
      user_login: '',
      user_pass: '',
    }
  },
  onLoad(options){
  },
  methods:{
    checkForm(){
      var verifyCon = [
        ['n', 'isEmpty', this.user_login, '请输入登录账号'],
        ['p', 'isEmpty', this.user_pass, '请输入登录密码'],
      ];

      var verifyRes = verify(verifyCon, true)
      if(verifyRes){
        uni.showToast({
        	title: verifyRes[3],
          icon: "none"
        })
        return false;
      }
      this.login();
    },
    login(){
      uni.showLoading({
      	title: "登录中"
      })
      this.wjPost(this, 'login', {
        user_login: this.user_login,
        user_pass: this.user_pass
      }, (res)=>{
        uni.hideLoading()
        uni.showToast({
        	title: res.message,
          icon: "none"
        })
        if(res.success) {
          uni.setStorageSync('userInfo', res.data);
          setTimeout(()=>{
            uni.navigateBack({
              delta: 1,
            })
          }, 1500)
        }
      })
    },
    
    // #ifdef MP-WEIXIN || MP-QQ
    bindGetUserInfo(e){
      var type = e.target.dataset.type;
      if(!(e.detail.errMsg == 'getUserInfo:ok')) return false;
      uni.showLoading({
        title: '登录中',
      })
      wx.login({
        success: (res)=>{
          var jsCode = res.code;
          this.wjPost(this, 'wxspAuth', {
            wx_code: jsCode,
            type: type,
            ...e.detail.userInfo
          }, (res)=>{
            uni.hideLoading();
            if(res.success){
              uni.setStorageSync('userInfo', res.data);
              uni.showToast({
                title: res.message,
                icon: 'none'
              })
              setTimeout(()=>{
                uni.switchTab({
                  url: '/pages/ucenter/view'
                })
              }, 1500)
            }
          })
        }
      })
    },
    // #endif
    
    // #ifdef MP-ALIPAY
    // 支付宝授权
    // 是否需要获取基础资料
    alipayGetUserInfo(){
      uni.showLoading({
        title: '登录中',
      })
      my.getAuthCode({
        scopes: 'auth_base',
        success: (res) => {
          var auth_code = res.authCode;
          my.getOpenUserInfo({
            success: (res) => {
              var userInfo = JSON.parse(res.response);
              userInfo = userInfo.response;
              this.wjPost(this, 'alipayAuth', {
                auth_code: auth_code,
                ...userInfo
              }, (res)=>{
                uni.hideLoading()
                uni.showToast({
                  title: res.message,
                  icon: 'none',
                })
                if(res.success){
                  uni.setStorageSync('userInfo', res.data)
                  setTimeout(()=>{
                    uni.switchTab({
                      url: '/pages/ucenter/view'
                    })
                  }, 1500)
                }
              })
            },
            fail: (res) => {
              uni.showToast({
                title: '用户取消授权',
                icon: 'none'
              })
            }
          })
        },
      });
    },
    onAuthError(e){
      console.log(e, 'error');
    },
    // #endif
    
    // APP QQ 和 微博 登录
    getAuthLogin(platform){
      //console.log(platform);
      uni.login({
        provider: platform,
        success: (resp) => {
          //console.log(JSON.stringify(resp));
          uni.getUserInfo({
            provider: platform,
            success: (infoRes)=>{
              console.log(JSON.stringify(infoRes));
              var command = '';
              if(platform=='qq'){
                command = 'qqAuth';
              }else if(platform=='sinaweibo'){
                command = 'weiboAuth';
              }
              this.AuthLogin(Object.assign(infoRes.userInfo, resp.authResult), command);
            }
          })
        },
        fail: (err) => {
          uni.showToast({
            title: err.errMsg,
            icon: 'none',
          })
        }
      })
    },
    
    AuthLogin(userInfo, command){
      console.log(JSON.stringify(userInfo))
      uni.showLoading({
        title: '登录中'
      })
      this.wjPost(this, command, userInfo, (res)=>{
        uni.hideLoading()
        uni.showToast({
          title: res.message,
          icon: 'none',
        })
        if(res.success){
          uni.setStorageSync('userInfo', res.data);
          setTimeout(()=>{
            uni.switchTab({
              url: '/pages/ucenter/view',
            })
          }, 1500)
        }
      })
    }
    
  }
}