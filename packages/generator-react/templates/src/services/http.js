import axios from 'axios';
import Toast from 'yh-poplar/lib/Toast';
import {
  DEV_BASE_URL,
  RELEASE_BASE_URL,
  TEST_BASE_URL
} from '@/constants/baseURL';

let baseURL = DEV_BASE_URL;

if (process.env.NODE_ENV === 'production') {
  baseURL = RELEASE_BASE_URL;
}

if (process.env.NODE_ENV === 'test') {
  baseURL = TEST_BASE_URL;
}

const http = axios.create({
  baseURL,
  headers: {
    identityId: window.sessionStorage.getItem('identityId')
  }
});

const request = async params => {
  let id = null;
  if (params.loading) {
    id = Toast.loading('数据请求中');
  }
  let resData = {};
  try {
    delete params.loading;
    const res = await http({
      ...params
    });

    if (id) {
      Toast.hide(id);
    }

    resData = res.data;
    if (resData.success) {
      return resData.data;
    }
  } catch (err) {
    resData.errorMsg = err.message;
  }

  if (id) {
    Toast.hide(id);
  }

  Toast.show(resData.errorMsg || '系统服务异常', {
    duration: Toast.LONG
  });
  throw new Error(resData.errorMsg);
};

const get = async params => {
  return request({
    ...params,
    method: 'get'
  });
};

const post = async params => {
  return request({
    ...params,
    method: 'post'
  });
};

export default {
  get,
  post
};
