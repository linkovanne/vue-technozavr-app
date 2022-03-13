import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '@/pages/MainPage';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';
import NotFoundPage from '@/pages/NotFoundPage';
import OrderPage from '@/pages/OrderPage';
import OrderInfoPage from '@/pages/OrderInfoPage';

const routes = [
  { path: '/', name: 'main', component: MainPage },
  { path: '/product/:id', name: 'product', component: ProductPage },
  { path: '/cart', name: 'cart', component: CartPage },
  { path: '/order', name: 'order', component: OrderPage },
  { path: '/order/:id', name: 'orderInfo', component: OrderInfoPage },
  { path: '/:catchAll(.*)', name: 'notFound', component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory('/vue-technozavr-app/'),
  routes,
});

export default router;
