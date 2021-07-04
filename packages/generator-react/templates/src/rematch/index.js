import { init } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import createOrderModel from './models/createOrder';

const immer = immerPlugin();

const store = init({
  plugins: [immer],
  models: {
    createOrderModel,
    // orderDetailModel,
    orderHistoryModel
  }
});

export default store;
