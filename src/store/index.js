import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default new Vuex.Store({
  state: {
    cartProducts: [],
    cartProductsData: [],
    userAccessKey: null,
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    updateUserAccessKey(state, userAccessKey) {
      state.userAccessKey = userAccessKey;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    addCartProductData(state, items) {
      state.cartProductsData = items;
    },
    updateCartProductQuantity(state, {
      id,
      quantity,
    }) {
      const product = state.cartProducts.find((item) => item.id === id);

      if (product) {
        product.quantity = quantity;
      }
    },
    deleteProductFromCart(state, id) {
      state.cartProducts = state.cartProductsData.filter((item) => item.id !== id);
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));
    },
  },
  getters: {
    cartDetailedProducts(state) {
      return state.cartProductsData.map((item) => ({
        ...item,
        details: state.cartProductsData.find((product) => product.id === item.id).product,
      }));
    },
    cartTotalPrice(state, gettres) {
      return gettres.cartDetailedProducts.reduce((acc, item) => (item.details.price * item.quantity) + acc, 0);
    },
    cartTotalQuantity(state, gettres) {
      return gettres.cartDetailedProducts.reduce((acc, item) => (item.quantity) + acc, 0);
    },
    orderDetailedInfo(state) {
      return state.orderInfo;
    },
  },
  actions: {
    getCartData(context) {
      return axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((res) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', res.data.user.accessKey);
            context.commit('updateUserAccessKey', res.data.user.accessKey);
          }

          context.commit('addCartProductData', res.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, {
      productId,
      quantity,
    }) {
      return (new Promise((resolve) => setTimeout(resolve, 200)))
        .then(() => axios
          .post(`${API_BASE_URL}/api/baskets/products`, {
            productId,
            quantity,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((res) => {
            context.commit('addCartProductData', res.data.items);
            context.commit('syncCartProducts');
          }));
    },
    updateCartProductQuantity(context, {
      productId,
      quantity,
    }) {
      context.commit('updateCartProductQuantity', {
        productId,
        quantity,
      });

      if (quantity < 1) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((res) => context.commit('addCartProductData', res.data.items))
        .catch(() => context.commit('syncCartProducts'));
    },
    deleteProductFromCart(context, {
      productId,
    }) {
      context.commit('deleteProductFromCart', {
        productId,
      });

      return (new Promise((resolve) => setTimeout(resolve, 200)))
        .then(() => axios
          .delete(`${API_BASE_URL}/api/baskets/products`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
            data: {
              productId,
            },
          })
          .then((res) => context.commit('addCartProductData', res.data.items))
          .catch(() => context.commit('syncCartProducts')));
    },
    getOrderInfo(context, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((res) => {
          context.commit('updateOrderInfo', res.data);
        });
    },
  },
});
