const config = {
  // api 请求地址
  APIURL: "https://www.wenjiangs.com/wjson/",
  // web 应用地址
  WEBURL: "https://www.wenjiangs.com",
  // socket 地址
  WSURL: 'wss://socket.wenjiangs.com:42568',
  // 本地缓存到期时间,默认为1天
  cacheExpire: 60*60*24,
  // 是否调试模式
  isDebug: true,
}
export default config;