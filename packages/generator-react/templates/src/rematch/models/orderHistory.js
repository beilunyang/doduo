import orderServices from '@/services/order';

const getTabParams = tab => {
  switch (tab) {
    case 'delivered':
      return {
        printStatus: 1
      };
    case 'closed':
      return {
        isDeleted: 1
      };
    default:
      return {
        printStatus: 0
      };
  }
};

const orderHistoryModel = {
  state: {
    currentTab: 'ordered',
    ordered: {
      currentPage: 1,
      totalPage: 1,
      totalCount: 0,
      orders: []
    },
    delivered: {
      currentPage: 1,
      totalPage: 1,
      totalCount: 0,
      orders: []
    },
    closed: {
      currentPage: 1,
      totalPage: 1,
      totalCount: 0,
      orders: []
    }
  },
  reducers: {
    resetAll() {
      return {
        currentTab: 'ordered',
        ordered: {
          currentPage: 1,
          totalPage: 1,
          totalCount: 0,
          orders: []
        },
        delivered: {
          currentPage: 1,
          totalPage: 1,
          totalCount: 0,
          orders: []
        },
        closed: {
          currentPage: 1,
          totalPage: 1,
          totalCount: 0,
          orders: []
        }
      };
    },
    resetTabHistory(state, payload) {
      state[payload] = {
        currentPage: 1,
        totalPage: 1,
        totalCount: 0,
        orders: []
      };
      return state;
    },
    setPageInfo(state, payload) {
      const { currentTab } = state;
      state[currentTab].totalPage = payload.totalPage;
      state[currentTab].totalCount = payload.totalCount;
      return state;
    },
    setTab(state, payload) {
      state.currentTab = payload;
      return state;
    },
    setOrders(state, payload) {
      const { currentTab } = state;
      state[currentTab].orders = state[currentTab].orders.concat(payload);
      state[currentTab].currentPage += 1;
      return state;
    }
  },
  effects: dispatch => ({
    async fetchOrders(_, rootState) {
      const {
        orderHistoryModel: { currentTab }
      } = rootState;
      const { currentPage, totalPage } = rootState.orderHistoryModel[
        currentTab
      ];
      if (currentPage > totalPage) {
        console.log('到底了');
        return;
      }
      const data = await orderServices.getOrderList({
        pageNum: currentPage,
        ...getTabParams(currentTab)
      });
      dispatch.orderHistoryModel.setPageInfo({
        totalPage: data.totalPage,
        totalCount: data.total
      });
      dispatch.orderHistoryModel.setOrders(data.list);
    },
    async changeTab(payload, rootState) {
      const {
        orderHistoryModel: { setTab, refresh }
      } = dispatch;
      setTab(payload);
      const { orders } = rootState.orderHistoryModel[payload];
      if (orders.length > 0) {
        return;
      }
      await refresh();
    },
    async refresh(_, rootState) {
      const {
        orderHistoryModel: { currentTab }
      } = rootState;
      const {
        orderHistoryModel: { resetTabHistory, fetchOrders }
      } = dispatch;
      resetTabHistory(currentTab);
      await fetchOrders();
    }
  })
};

export default orderHistoryModel;
