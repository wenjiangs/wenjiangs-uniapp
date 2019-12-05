const verify ={
  /**
   * 检测是否是数字或数字字符串
   * @param num
   * @returns {boolean}
   */
  isNumeric:(num)=>{
    if (!isNaN(num)) {
      for (var i = 0; i < num.length; i++) {
        if (isNaN(num.charAt(i))) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  },
  //验证手机号码
  CheckMoble :(mobile)=>{
    // mobile = common.trim(mobile,'')
    if(mobile == undefined) return false;
    var patt = /^1[3,4,5,6,7,8,9]{1}[0-9]{1}[0-9]{8}$/;
    return patt.test(mobile);
  },

  //验证邮箱
  CheckEmail(str) {
    if(str == undefined) return false;
    return str.match(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g);
  },

  //验证字符长度
  length:(str,len)=>{
    if(str == undefined) return false;
    str = typeof str == "string"? str :str.toString();
    // str = common.trim(str,'')
    if(str.gblen() != len){
      return false;
    }
    return true;
  },

  //验证字符长度范围
  scope: (str,start,end)=>{
    if(str == undefined) return false;
    str = typeof str == "string" ? str : str.toString();
    if(str.length < start || str.length > end){
      return false;
    }
    return true;
  },

  //验证字符是否为空
  isEmpty:(str)=>{
    // str = common.cTrim(str, '');
    if(str == undefined){return false}
    str = typeof str == "string"? str :str.toString();
    // str = common.trim(str,'')
    if(str == ''){return false}else{return true;}
  },

  //判断变量是否为真
  trueFalse:(val)=>{
    return val;
  },

  //判断数字范围
  isNumScope:(num,min,max)=>{
    if(verify.isNumeric(num) && verify.isNumeric(num) && verify.isNumeric(num)){
      return ( Number(num) <= Number(min) || Number(num) >= Number(max));
    }else{
      return false;
    }
  },

  //判断值小于某个数
  isNumMin:(num,min)=>{
    if(verify.isNumeric(num) && verify.isNumeric(min)){
      return (Number(num) >= Number(min));
    }else{
      return false;
    }
  },
  //判断值大于某个数
  isNumMax:(num,max)=>{
    if(verify.isNumeric(num) && verify.isNumeric(max)){
      return (Number(num) <= Number(max));
    }else{
      return false;
    }
  },

  //比较连个值相等
  equalTo:(val1,val2)=>{
    return val1!=val2;
  },

  //比较连个值相等
  equalTo1:(val1,val2)=>{
    return val1==val2;
  },

  //判断是否为正确的货币字符串
  checkCurrency(str){
    if(str == '') return false;
    var re = /^\d+\.?\d{0,2}$/;
    if(re.test(str)){
      return true
    }else{
      return false
    }
  },

  //字母和数字组合
  numberAndLetter(str){
    if(str == '') return false;
    var re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/;
    if(re.test(str)){
      return true
    }else{
      return false
    }
  },

  //货币金额是否大于某个值
  currencyMax(num, max){
    if(verify.checkCurrency(num) && verify.checkCurrency(max)){
      return (num <= max);
    }else{
      return false;
    }
  },

  checkRate(str){
    if(str == undefined){return false}
    str = typeof str == "string"? str :str.toString();
    var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字,//若判断正整数，则后边是：/^[1-9]+[0-9]*]*$/
    if (!re.test(str)){
      return false;
    }else{
      return true;
    }
  },

  /**
   * 验证身份证
   */
  identityCard(code){
     var {pass,tip} = common.IdentityCodeValid(code.toUpperCase())
     return pass
  },

  // 校验网址
  CheckUrl(str){
    var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    if(!reg.test(str)){
      return false;
    }else{
      return true;
    }
  },

  /**
   * 自定义验证
   */
  cv(cd,p){
    return cd(p)
  },

}


export default (verifyObj, group, all)=>{
  var err = [];
  if(group){
    verifyObj.map((v)=>{
      if(verify[v[1]]){
        var verifyRes = verify[v[1]](v[2],v[4],v[5]);
        if(!verifyRes){
          err.push(v);
          return;
        }
      }
    });

    if(err.length>0){
      return err[0];
    }
  }else{
    verifyObj.map((v)=>{
      if(verify[v[0]]){
        var verifyRes = verify[v[0]](v[1],v[3],v[4]);
        if(!verifyRes){
          err.push(v);
          return;
        }
      }
    });

    if(err.length>0){
      if(all){
        return err;
      }else{
        return err[0][2];
      }
    }
  }

  return null;
}
