import verify from '@/common/js/verify.js';

export default {
  data() {
		return {
      repObjectData: [
        '垃圾营销',
        '不实信息',
        '有害信息',
        '违法信息',
        '淫秽色情',
        '人身攻击我',
        '抄袭我的内容',
        '冒充我',
        '泄露我的隐私',
      ],
      repObjectIndex: -1,
      repObjectVal: '',
      repContent: '',
      repType: '',
      user: {},
      isSubmiting: false,
    }
  },
  onShow(){
    this.pageAuthControl();
  },
  onLoad(options){
    this.repType = options.type;
    this.repID = options.id;
    this.userInfo = uni.getStorageSync('userInfo');
    
    if(options.type=='user'){
      uni.showLoading({
        title: '加载中',
      })
      this.getUser(this, this.repID, (res)=>{
        uni.hideLoading();
        this.user = res.data;
      }, false)
    }
    
  },
  methods:{
    repObjectChange(e){
      this.repObjectIndex = e.detail.value
      this.repObjectVal = this.repObjectData[this.repObjectIndex];
    },
    checkForm(){
      if(this.isSubmiting) return;
      var verifyCon = [
        ['n', 'trueFalse', this.repObjectIndex>-1, '请选择举报类型'],
        ['p', 'isEmpty', this.repContent, '请填写举报内容'],
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
      uni.showLoading({
        title: '提交中'
      })
      this.wjPost(this, 'accusation', {
        token: this.userInfo.token,
        user_id: this.userInfo.ID,
        accusation_path: JSON.stringify({
          type: this.repType,
          id: this.repID
        }),
        accusation_type: this.repObjectVal,
        accusation_content: this.repContent,
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
    }
  }
}