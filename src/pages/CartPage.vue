<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Корзина</a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">{{ totalCount }} товара</span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <li v-for="product in products" :key="product.id" class="cart__item product">
              <CartItem :product="product"/>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">Итого: <span>{{ numberFormat(totalPrice) }} ₽</span></p>

          <template v-if="products.length">
            <router-link :to="{name: 'order'}" tag="button"
                         class="cart__button button button--primery">Оформить заказ</router-link>
          </template>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CartPage',
  components: {
    CartItem,
  },
  methods: {
    numberFormat(value) {
      return numberFormat(value);
    },
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailedProducts',
      totalPrice: 'cartTotalPrice',
      totalCount: 'cartTotalQuantity',
    }),
  },
};
</script>

<style scoped></style>
