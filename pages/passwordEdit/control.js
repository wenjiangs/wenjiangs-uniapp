import verify from '@/common/js/verify.js';

export default {
  data() {
		return {
      old_pass: '',
      new_pass: '',
      new_pass2: '',
      isSubmiting: false,
      userInfo: null,
    }
  },
  onLoad(options){
    this.userInfo = uni.getStorageSync('userInfo');
  },
  methods:{
    checkForm(){
      if(this.isSubmiting) return;
      var verifyCon = [
        ['n', 'isEmpty', this.old_pass, '请输入原始密码'],
        ['p', 'isEmpty', this.new_pass, '请输入新密码'],
        ['p', 'scope', this.new_pass, '新密码长度6-18个字符', 6, 18],
        ['p', 'isEmpty', this.new_pass2, '请输入确认密码'],
        ['p', 'trueFalse', this.new_pass2==this.new_pass, '两次输入的密码不一致'],
      ];
      
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
      this.wjPost(this, 'updateUser', {
        meta_name: 'user_pass',
        user_login: this.userInfo.user_login,
        meta_value: this.old_pass,
        meta_value2: this.new_pass
      }, (res)=>{
        this.isSubmiting = false;
        uni.showToast({
          title: res.message,
          icon: 'none'
        })
        if(res.success){
          setTimeout((res)=>{
            uni.navigateBack({
              delta: 1
            })
          }, 1500)
        }
      })
    }
  }
}