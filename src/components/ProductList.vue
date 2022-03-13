<template>
  <ul class="catalog__list">
    <li v-for="product in products" :key="product.id" class="catalog__item">
      <ProductItem :product="product"/>
    </li>
  </ul>
</template>

<script>
import ProductItem from './ProductItem';

export default {
  name: 'ProductList',
  components: {
    ProductItem,
  },
  props: ['products'],
};
</script>

<style scoped></style>
