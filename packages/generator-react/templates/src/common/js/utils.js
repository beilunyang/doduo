/* eslint-disable no-param-reassign */
import ClipboardJS from 'clipboard';
import Toast from 'yh-poplar/lib/Toast';

export function getQueryString(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[[]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const checkPhone = phone => {
  const isPhone = /^(0[\d]{2,3}-[\d]{7,8})|(0[\d]{9,11})$/; // 普通座机
  const isPhone2 = /^(400[\d]{6,8})|(400-[\d]{3,4}-[\d]{3,4})$/; // 400座机
  return isPhone.test(phone) || isPhone2.test(phone);
};

export const checkMobile = mobile => {
  const isMob = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
  return isMob.test(mobile);
};

export const checkUserName = username => {
  // 姓名校验正则
  return /(^[\u4E00-\u9FA5]+$)|(^[\u4E00-\u9FA5]*·[\u4E00-\u9FA5]*$)|(^[A-Za-z]+$)/.test(
    username
  );
};

export const checkSpecialChar = str => {
  return new RegExp("[&/^$<>@']").test(str);
};

let clipboard = null;
export const initClipboard = () => {
  if (clipboard) {
    return;
  }
  clipboard = new ClipboardJS('.copy');
  clipboard.on('success', () => {
    Toast.show('复制成功');
  });
  clipboard.on('error', () => {
    if (ClipboardJS.isSupported()) {
      Toast.show('复制失败');
      return;
    }
    Toast.show('您的微信版本不支持复制');
  });
};
