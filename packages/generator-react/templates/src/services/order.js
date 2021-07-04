import dayjs from 'dayjs';
import http from './http';
import {
  ADD_ORDER,
  GET_ORDER_LIST,
  GET_ORDER_INFO
} from '@/constants/endpoint';

const createOrder = async info => {
  const data = await http.post({
    url: ADD_ORDER,
    data: {
      ...info,
      comId: window.localStorage.getItem('comId'),
      toUserId: window.localStorage.getItem('toUserId')
    }
  });
  return data;
};

const getOrderList = async params => {
  const today = dayjs();
  const data = await http.post({
    loading: true,
    url: GET_ORDER_LIST,
    data: {
      pageSize: 10,
      comId: window.localStorage.getItem('comId'),
      orderSource: '0',
      beginCreateTime: today.subtract(1, 'week').format('YYYY-MM-DD'),
      endCreateTime: today.format('YYYY-MM-DD'),
      ...params
    }
  });
  console.log('getOrderList_data:', data);
  return data;
};

const getOrderDetail = async id => {
  const data = await http.post({
    loading: true,
    url: GET_ORDER_INFO,
    data: {
      id,
      userId: window.localStorage.getItem('toUserId'),
      comId: window.localStorage.getItem('comId')
    }
  });
  console.log('getOrderDetail_data:', data);
  return data;
};

export default {
  createOrder,
  getOrderList,
  getOrderDetail
};
