<template>
  <div class="catalog__item-wrap">
    <router-link :to="{name: 'product', params: {id: product.id}}" class="catalog__pic">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: product.id}}">{{ product.title }}</router-link>
    </h3>

    <span class="catalog__price">{{ numberFormat }} ₽</span>

    <ul class="colors colors--black">
      <li v-for="color in product.colors" :key="color.id" class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color.id" v-model="currentColor">
          <span class="colors__value" :style="{backgroundColor: color.code}"></span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  props: ['product'],
  data() {
    return {
      currentColor: this.product.colors[0],
    };
  },
  computed: {
    numberFormat() {
      return numberFormat(this.product.price);
    },
  },
};
</script>

<style scoped></style>
