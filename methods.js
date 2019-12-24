import config from './config';
import pageAuth from './pageAuth';

const methods = {

  //封装路由跳转
  wjRouterPush: (params) => {
    if (typeof params == 'object' && 'path' in params) {
      uni.navigateTo({
        url: "/pages/" + params.path + "/view?" + methods.param(params.query)
      })
    } else {
      uni.navigateTo({
        url: "/pages/" + params + "/view"
      })
    }
  },
  wjRouterReplace(params) {
    if (typeof params == 'object' && 'path' in params) {
      uni.redirectTo({
        url: "/pages/" + params.path + "/view?" + methods.param(params.query)
      })
    } else {
      uni.redirectTo({
        url: "/pages/" + params + "/view"
      })
    }
  },
  wjRouterSwitchTab(params) {
    uni.switchTab({
      url: "/pages/" + params + "/view"
    })
  },
  wjRouterGo(number=1) {
    uni.navigateBack({
      delta: number
    })
  },

  // 封装API post 请求方法
  wjPost(obj, commandName, input, cb) {
    var userInfo = uni.getStorageSync('userInfo');
    if (userInfo) {
      input.user_id = userInfo.ID;
      input.token = userInfo.token;
    }
    uni.request({
      url: config.APIURL,
      method: 'post',
      data: {
        model: commandName,
        action: JSON.stringify(input)
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        cb(res.data)
      },
      fail: (res)=>{
        cb({success: false, data: res})
      }
    })
  },

  // 更新用户信息
  getUser(obj, user_id, cb, isSelf = true) {
    var userInfo = uni.getStorageSync('userInfo');

    // 是否查询当前用户
    var params = {};
    if (isSelf) {
      if (this.isEmpty(userInfo) && !user_id) {
        cb({
          success: false
        })
        return;
      }
    } else {
      params = {
        accept_id: user_id
      }
    }

    this.wjPost(obj, 'getUser', params, (res) => {
      if (isSelf) {
        if (res.success) {
          uni.setStorageSync('userInfo', res.data);
        } else {
          uni.clearStorageSync();
        }
      }
      cb(res);
    })
  },

  // 获取未读消息
  getUnreadNum() {
    this.wjPost(this, 'getUnread', {}, (res) => {
      if (res.data > 0) {
        uni.setTabBarBadge({
          index: 2,
          text: res.data
        })
        this.unReadNum = res.data;
      } else {
        if (this.unReadNum > 0) {
          uni.removeTabBarBadge({
            index: 2
          });
        }
      }
    })
  },

  isEmpty(str) {
    if (str == "" || str == null || str == undefined ||
      JSON.stringify(str) == '[]' || JSON.stringify(str) == '{}') {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 退出登录
   */
  logout() {
    uni.clearStorageSync()
    uni.redirectTo({
      url: '/pages/login/view'
    })
  },

  /**
   * 从数组中移出空元素,包括 空字符串/null/空数组/空对象
   */
  removeEmptyArrayEle(arr) {
    var temArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (!this.isEmpty(arr[i])) {
        temArr.push(arr[i])
      }
    }
    return temArr;
  },

  // 元素是否在数组中
  in_array(search, array) {
    for (var i in array) {
      if (array[i] == search) {
        return true;
      }
    }
    return false;
  },

  // 对象的深拷贝
  deepCopy(obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          //判断ojb子元素是否为对象，如果是，递归复制
          if (obj[key] && typeof obj[key] === "object") {
            objClone[key] = this.deepCopy(obj[key]);
          } else {
            //如果不是，简单复制
            objClone[key] = obj[key];
          }
        }
      }
    }
    return objClone;
  },

  // 生成唯一jstoken
  jsGuid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    function guid() {
      return (S4() + S4() + "-" + S4() + "-" + S4());
    };
    return guid();
  },

  /**
   * @description 加法运算
   * @param {Number} ID 资源ID
   * @param {String} type 资源类型
   * @param {Function} 回调函数 
   */
  collection(ID, Type, cb) {
    var userInfo = uni.getStorageSync('userInfo');
    if (this.isEmpty(userInfo)) {
      uni.showToast({
        title: '请先登录',
        icon: 'none',
      });
      return;
    }
    uni.showLoading({
      title: '请稍后',
    })
    this.wjPost(this, 'collection', {
      item_id: ID,
      item_type: Type
    }, (res) => {
      uni.hideLoading()
      uni.showToast({
        title: res.message,
        icon: 'none',
      })
      cb(res);
    })
  },

  // 隐藏部分内容以星号*代替
  filterInfo(str, start, end, isEmail = false) {
    if (isEmail) {
      var em = str.split('@');
      str = em[0];
    }
    var s = str.substr(0, start);
    var e = str.substr(str.length - end, str.length - 1);
    var d = "*******************************".substr(0, str.length - start - end)
    if (isEmail) {
      return s + d + e + '@' + em[1];
    }
    return s + d + e;
  },

  // 判断字符串是否是JSON
  isJSON(str) {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
  },

  // 路由拦截
  pageAuthControl(cb = () => {}) {
    var pages = getCurrentPages();
    var curPage = pages[pages.length - 1].route.replace('pages/', '').replace('/view', '');
    for (let i = 0; i < pageAuth.length; i++) {
      if (pageAuth[i].page == curPage && pageAuth[i].auth) {
        // 需要登录授权
        var userInfo = uni.getStorageSync("userInfo");
        if (this.isEmpty(userInfo)) {
          uni.removeStorageSync('userInfo')
          cb({
            success: false,
            message: '用户数据为空'
          })
          return;
        } else {
          // 有用户缓存，更新用户信息
          this.getUser(this, userInfo.ID, (res) => {
            if (!res.success) {
              uni.removeStorageSync('userInfo')
              cb({
                success: false,
                message: '用户数据不为空，数据失效'
              })
              return;
            } else {
              cb(res);
            }
          })
        }
      }
    }
  },

  // json to queryString
  cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i])
      }
    }
    return newArray
  },
  param(json) {
    if (!json) return ''
    return this.cleanArray(Object.keys(json).map(key => {
      if (json[key] === undefined)
        return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })).join('&')
  },

  // 版本号转换为数字
  versionToNumber(version) {
    var version = version.toString();
    var c = version.split('.');
    var num_place = ["", "0", "00", "000", "0000"];
    var r = num_place.reverse();
    for (var i = 0; i < c.length; i++) {
      var len = c[i].length;
      c[i] = r[len] + c[i];
    }
    var res = c.join('');
    return res;
  },

  // 给富文本添加类
  addClassToHtml(str) {
    str = str.replace(/<h1/gi, '<h1 class="rich-h1"');
    str = str.replace(/<h2/gi, '<h2 class="rich-h2"');
    str = str.replace(/<h3/gi, '<h3 class="rich-h3"');
    str = str.replace(/<p>/gi, '<p class="rich-p">');
    str = str.replace(/<img/gi, '<img class="rich-img"');
    str = str.replace(/<code/gi, '<code class="rich-code"');
    str = str.replace(/<ul/gi, '<ul class="rich-ul"');
    str = str.replace(/<ol/gi, '<ol class="rich-ol"');
    str = str.replace(/<pre/gi, '<pre class="rich-pre"');
    str = str.replace(/<\/pre>/gi, '</pre>');
    str = str.replace(/<table/gi, '<table class="rich-table"');
    str = str.replace(/<thead>/gi, '<thead class="rich-thead">');
    str = str.replace(/<tr/gi, '<tr class="rich-tr"');
    str = str.replace(/<td/gi, '<td class="rich-td"');
    str = str.replace(/<th>/gi, '<th class="rich-th">');
    str = str.replace(/<tbody/gi, '<tbody class="rich-tbody"');
    str = str.replace(/<tfoot/gi, '<tfoot class="rich-tfoot"');
    return str;
  },

  /**
   * 中国正常GCJ02坐标---->百度地图BD09坐标
   * 腾讯地图用的也是GCJ02坐标
   * @param double $lat 纬度
   * @param double $lng 经度
   */
  Convert_GCJ02_To_BD09($lat, $lng) {
    var $x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var $x = $lng;
    var $y = $lat;
    var $z = Math.sqrt($x * $x + $y * $y) + 0.00002 * Math.sin($y * $x_pi);
    var $theta = Math.atan2($y, $x) + 0.000003 * Math.cos($x * $x_pi);
    $lng = $z * Math.cos($theta) + 0.0065;
    $lat = $z * Math.sin($theta) + 0.006;
    return {
      'lng': $lng,
      'lat': $lat
    }
  },

  /**
   * 百度地图BD09坐标---->中国正常GCJ02坐标
   * 腾讯地图用的也是GCJ02坐标
   * @param double $lat 纬度
   * @param double $lng 经度
   * @return array();
   */
  Convert_BD09_To_GCJ02($lat, $lng) {
    var $x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var $x = $lng - 0.0065;
    var $y = $lat - 0.006;
    var $z = Math.sqrt($x * $x + $y * $y) - 0.00002 * Math.sin($y * $x_pi);
    var $theta = Math.atan2($y, $x) - 0.000003 * Math.cos($x * $x_pi);
    $lng = $z * Math.cos($theta);
    $lat = $z * Math.sin($theta);
    return {
      'lat': $lat,
      'lng': $lng
    }
  },

  // 获取微信授权配置信息
  getSetting(cb = () => {}) {
    this.wjPost(this, 'getSetting', {
      cur_url: location.href.split('#')[0],
    }, (res) => {
      if (res.success) {
        uni.setStorageSync('setting', res.data);
        cb(res);
      }
    });
  },

  // 获取网站基本信息
  getOptions(cb = () => {}) {
    let options = this.wjGL('options')
    if(options){
      cb({success: true, data: options});
      return;
    }
    this.wjPost(this, 'getOptions', {}, (res) => {
      if (res.success) {
        this.wjSL('options', res.data);
        cb(res);
      }
    });
  },

  // 如果资源路径缺少域名,自动添加 WEBURL 地址
  $imgUrl(value) {
    if (typeof value !== 'string') {
      return ''
    }
    let a = value.toLowerCase()
    if (a.match(/http|https:\/\/g/)) {
      return value
    } else {
      return config.WEBURL + value
    }
  },

  /**
   * 自定义 本地缓存储存函数
   */
  wjSL(key, val, expire){
    let timestamp = Date.parse(new Date())/1000;
    if(!expire) expire = config.cacheExpire;
    let temObj = {
      data: val,
      expire: timestamp + expire
    }
    uni.setStorageSync(key, temObj);
  },
  
  /**
   * 自定义 获取获取本地缓存
   */
  wjGL(key){
    let expire = config.cacheExpire;
    let timestamp = Date.parse(new Date())/1000;
    let temObj = uni.getStorageSync(key);
    if(temObj){
      if(temObj.expire && temObj.expire<timestamp){
        // 缓存超时
        return;
      }else{
        return temObj.data;
      }
    }else{
      return;
    }
  },
}

export default methods;
