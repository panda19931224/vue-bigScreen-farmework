/* eslint-disable space-infix-ops */
/**
 * Created by chang on 2017/8/2.
 */
import axios from 'axios'
import config from '../../config/index'

/**
 * 成功处理
 * @param res
 * @param load
 */
function successParse (res, load) {
  try {
    return JSON.parse(res.data)
  } catch (ex) {
    return res.data
  }
}

/**
 * 失败处理
 * @param ex
 * @param load
 * @returns {Promise.<*>|Promise<R>}
 */
function errorParse (ex) {
  switch (ex && ex.status) {
    case 401:
      // 权限过期
      return Promise.reject({ status: 401, msg: '您的权限已过期，请重新登录！' }) // eslint-disable-line
    case 400:
      // 请求参数错误
      return Promise.reject({ status: 400, msg: '提交的数据有错误！' }) // eslint-disable-line
    case 500:
      // 系统错误
      return Promise.reject({ status: 500, msg: '系统报错啦，请联系管理员！' }) // eslint-disable-line
    default:
      // 其它
      return Promise.reject({ status: 500, msg: '网络异常，请稍后再试' }) // eslint-disable-line
  }
}

/**
 * 生成请求接口地址
 * @param url 接口地址
 * @returns {*}
 */
function requestUrl (url) {
  // 生产/测试环境
  if (process.env.NODE_ENV !== 'development') {
    if (url.startsWith('scene')) {
      // 测试环境
      if (process.env.NODE_ENV === 'testing') {
        // 测试环境，访问测试接口
        url = url.replace('scene', config.build.offlineApiUrl)
      } else {
        url = url.replace('scene', config.build.onlineApiUrl)
      }
    }
  } else {
    if (url.startsWith('scene')) {
      // 本地开发环境，调用测试接口
      url = url.replace('scene', config.build.offlineApiUrl)
    }
  }
  return url
}

/**
 * Ajax请求方法
 * @param url 接口地址
 * @param method 请求方式
 * @param body 请求参数
 * @param options header参数
 * @param load 是否显示请求loading
 * @param loadMsg loading的提示
 * @returns {Promise<U>|*|Promise|Promise.<T>}
 */
function send (url, method, body, options, load, loadMsg) {
  // 生成请求的url
  url = requestUrl(url)
  const opts = { ...options }
  opts.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...opts.headers
  }
  switch (method) {
    case 'get':
      return axios.get(url, { params: body, ...opts })
        .then(res => successParse(res))
        .catch(ex => errorParse(ex.response))
    case 'post':
      return axios.post(url, body, opts)
        .then(res => successParse(res))
        .catch(ex => errorParse(ex.response))
  }
}

export default {
  get (url, options, { load = true, loadMsg = '加载中...' } = {}) {
    return send(url, 'get', null, options, load, loadMsg)
  },
  post (url, body, options, { load = true, loadMsg = '加载中...' } = {}) {
    return send(url, 'post', body, options, load, loadMsg)
  },
  // 参数化GET入参方法
  getOfParam (url, query, options, { load = true, loadMsg = '加载中...' } = {}) {
    return send(url, 'get', query, options, load, loadMsg)
  }
}
