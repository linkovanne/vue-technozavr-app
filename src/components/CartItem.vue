<template>
  <div class="cart__item product">
    <div class="product__pic">
      <img :src="product.details.image.file.url" width="120" height="120"
           :alt="product.details.title">
    </div>
    <h3 class="product__title">{{ product.details.title }}</h3>
    <span class="product__code">Артикул: {{ product.details.id }}</span>

    <UiNumberInput v-model:productCount="productQuantity"/>

    <b class="product__price">{{ productTotalPrice }} ₽</b>

    <button class="product__del button-del"
            type="button" aria-label="Удалить товар из корзины"
            @click.prevent="deleteProduct(product.details.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import UiNumberInput from '@/components/UiNumberInput';

export default {
  name: 'CartItem',
  components: { UiNumberInput },
  props: ['product'],
  methods: {
    ...mapActions({
      updateCartProductQuantity: 'updateCartProductQuantity',
      deleteProductFromCart: 'deleteProductFromCart',
    }),
    deleteProduct(productId) {
      this.deleteProductFromCart({ productId });
    },
  },
  computed: {
    productQuantity: {
      get() {
        return this.product.quantity;
      },
      set(value) {
        this.updateCartProductQuantity({
          productId: this.product.details.id,
          quantity: value,
        });
      },
    },
    productTotalPrice() {
      return numberFormat(this.product.quantity * this.product.details.price);
    },
  },
};
</script>

<style scoped></style>
