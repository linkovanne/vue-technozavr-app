<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">Корзина</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Оформление заказа</a>
        </li>
      </ul>

      <h1 class="content__title">Заказ оформлен <span>№ {{ order?.id }}</span></h1>
    </div>

    <section v-if="order" class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями
            заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">Получатель</span>
              <span class="dictionary__value">{{ order.name }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Адрес доставки</span>
              <span class="dictionary__value">{{ order.address }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Телефон</span>
              <span class="dictionary__value">{{ order.phone }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Email</span>
              <span class="dictionary__value">{{ order.email }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Способ оплаты</span>
              <span class="dictionary__value">картой при получении</span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li v-for="product in order.basket.items" :key="product.id" class="cart__order">
              <h3>{{ product.product.title }}</h3>
              <b>{{ numberFormat(product.price) }} ₽</b>
              <span>Артикул: {{ product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ order.basket.items.length }}</b> товара
              на сумму <b>{{ numberFormat(order.totalPrice) }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
    <section v-else>
      <h1>Загружаем данные заказа...</h1>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'OrderInfoPage',
  created() {
    const orderId = this.$route.params.id;

    if (this.$store.state.orderInfo && this.$store.state.orderInfo === orderId) {
      return;
    }

    this.getOrderInfo(orderId);
  },
  methods: {
    ...mapActions(['getOrderInfo']),
    numberFormat(value) {
      return numberFormat(value);
    },
  },
  computed: {
    ...mapGetters({
      order: 'orderDetailedInfo',
    }),
  },
};
</script>

<style scoped></style>
