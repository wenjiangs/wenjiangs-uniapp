module.exports = {
  isConnect: false,
  lockReconnect: false,
  forbidReconnect: false,
  pingTimeoutId: null,
  pongTimeoutId: null,
  mySocket: null,
  opts: {
    url: '',
    pingTimeout: 15000,
    pongTimeout: 10000,
    reconnectTimeout: 2000,
    pingMsg: 'heartbeat',
    isDebug: true,
  },
  helloMsg: {
    type: "sign",
    user_id: 0,
    token: '',
  },

  // 方法函数
  createWebSocket(config = {}, cb = ()=>{}) {

    // 合并参数
    this.opts = Object.assign(this.opts, config);

    // 定义hellMsg
    let userInfo = uni.getStorageSync('userInfo');
    this.helloMsg.user_id = userInfo.ID;
    this.helloMsg.token = userInfo.token;
    
    // 发起连接
    console.log('发起连接');
    this.mySocket = uni.connectSocket({
      url: this.opts.url,
      success: (res)=>{
        console.log('connectSocket 调用成功');
      },
      fail: (res) => {
        console.log('socket 连接失败');
        this.reconnect();
      }
    });
    console.log('发起连接 end');
    // 创建监听函数
    // 连接打开执行绑定函数
    this.mySocket.onOpen((res)=>{
      // 连接成功开始心跳检查
      console.log('onSocketOpen', '连接成功开始心跳检查');
      this.isConnect = true;
      this.heartCheck();
      this.send(JSON.stringify(this.helloMsg));
      cb(res);
    })
    this.mySocket.onClose(() => {
      console.log('onClose');
      this.isConnect = false;
      this.reconnect();
    });
    this.mySocket.onError(() => {
      console.log('onError');
      this.isConnect = false;
      this.reconnect();
    });
    this.mySocket.onMessage((res) => {
      console.log('socket 收到消息，心跳检测重置');
      //如果获取到消息，心跳检测重置，拿到任何消息都说明当前连接是正常的
      this.heartCheck();
    });
  },
  send(msg) {
    this.mySocket.send({
      data: msg,
      success: (res) => {}
    })
  },
  reconnect() {
    if (this.lockReconnect || this.forbidReconnect) return;
    this.lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(() => {
      this.createWebSocket();
      this.lockReconnect = false;
    }, this.opts.reconnectTimeout);
  },
  heartCheck() {
    this.heartReset();
    this.heartStart();
  },
  heartStart() {
    if (this.forbidReconnect) return; //不再重连就不再执行心跳
    this.pingTimeoutId = setTimeout(() => {
      console.log('ping')
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      this.send(this.opts.pingMsg);
      //如果超过一定时间还没重置，说明后端主动断开了
      this.pongTimeoutId = setTimeout(() => {
        console.log('pong');
        //如果onclose会执行reconnect，我们执行ws.close()就行了.
        //如果直接执行reconnect 会触发onclose导致重连两次
        this.mySocket.close();
      }, this.opts.pongTimeout);
    }, this.opts.pingTimeout);
  },
  heartReset() {
    clearTimeout(this.pingTimeoutId);
    clearTimeout(this.pongTimeoutId);
  },
  close() {
    //如果手动关闭连接，不再重连
    this.forbidReconnect = true;
    this.isConnect = false;
    this.heartReset();
    this.mySocket.close();
  },
}