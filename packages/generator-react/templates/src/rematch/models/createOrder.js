import Toast from 'yh-poplar/lib/Toast';
import orderServices from '@/services/order';
import { checkMobile, checkPhone } from '@/common/javascript/utils';

const persistSender = data => {
  const {
    senderName,
    senderMobileOrPhone,
    senderProvince,
    senderCity,
    senderDistrict,
    senderDetail
  } = data;
  window.localStorage.setItem(
    'sender',
    JSON.stringify({
      senderName,
      senderMobileOrPhone,
      senderProvince,
      senderCity,
      senderDistrict,
      senderDetail
    })
  );
};

const hydrateSender = () => {
  return JSON.parse(window.localStorage.getItem('sender')) || {};
};

const initState = {
  // 商品信息
  goodsType: '日用品',
  weight: 1,
  senderRemark: '',
  quantity: 1,
  payType: '标准快递',
  freightAmount: '',
  codAmount: '',
  // 寄件人信息
  senderName: '',
  senderMobileOrPhone: '',
  senderProvince: '',
  senderCity: '',
  senderDistrict: '',
  senderDetail: '',
  // 收件人信息
  recipientName: '',
  recipientMobileOrPhone: '',
  recipientProvince: '',
  recipientCity: '',
  recipientDistrict: '',
  recipientDetail: ''
};

const createOrderModel = {
  state: {
    ...initState,
    ...hydrateSender()
  },
  reducers: {
    setCreateOrderInfo(state, payload) {
      const data = {
        ...state,
        ...payload
      };
      persistSender(data);
      return {
        ...state,
        ...payload
      };
    },
    resetCreateOrderInfo(state) {
      const {
        senderName,
        senderMobileOrPhone,
        senderProvince,
        senderCity,
        senderDistrict,
        senderDetail
      } = state;

      return {
        ...initState,
        // 寄件人信息
        senderName,
        senderMobileOrPhone,
        senderProvince,
        senderCity,
        senderDistrict,
        senderDetail
      };
    }
  },
  effects: {
    async createOrder(_, rootState) {
      const model = rootState.createOrderModel;
      const data = {
        ...model
      };
      const {
        senderName,
        senderMobileOrPhone,
        senderProvince,
        senderCity,
        senderDistrict,
        senderDetail,
        recipientName,
        recipientMobileOrPhone,
        recipientProvince,
        recipientCity,
        recipientDistrict,
        recipientDetail
      } = data;
      if (!senderName) {
        Toast.show('请填写寄件人姓名');
        return false;
      }
      if (!senderMobileOrPhone) {
        Toast.show('请填写寄件人电话号码');
        return false;
      }
      if (!senderProvince || !senderCity || !senderDistrict || !senderDetail) {
        Toast.show('请填写寄件人地址信息');
        return false;
      }
      if (!recipientName) {
        Toast.show('请填写收件人姓名');
        return false;
      }
      if (!recipientMobileOrPhone) {
        Toast.show('请填写收件人电话号码');
        return false;
      }
      if (
        !recipientProvince ||
        !recipientCity ||
        !recipientDistrict ||
        !recipientDetail
      ) {
        Toast.show('请填写收件人地址信息');
        return false;
      }

      if (checkMobile(senderMobileOrPhone)) {
        data.senderMobile = senderMobileOrPhone;
      }

      if (checkPhone(senderMobileOrPhone)) {
        data.senderPhone = senderMobileOrPhone;
      }

      if (checkMobile(recipientMobileOrPhone)) {
        data.recipientMobile = recipientMobileOrPhone;
      }

      if (checkPhone(recipientMobileOrPhone)) {
        data.recipientPhone = recipientMobileOrPhone;
      }

      delete data.senderMobileOrPhone;
      delete data.recipientMobileOrPhone;

      /* eslint-disable prefer-destructuring */
      if (data.goodsType.indexOf('其他') > -1) {
        data.goodsType = data.goodsType.split('-')[1];
      }

      await orderServices.createOrder(data);
      return true;
    }
  }
};

export default createOrderModel;
