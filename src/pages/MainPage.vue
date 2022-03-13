<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">{{ countProducts }} товара</span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-model:price-from="filterPriceFrom"
        v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId"
        v-model:color="filterColor"
      />

      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">
          При загрузке товаров произошла ошибка<br>
          <button @click.prevent="getProductsData()">Попробовать еще раз</button>
        </div>

        <ProductList :products="products"/>

        <UiPagination
          v-model:page="page"
          :count="countProducts"
          :per-page="perPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import ProductFilter from '@/components/ProductFilter';
import ProductList from '@/components/ProductList';
import UiPagination from '@/components/UiPagination';
import API_BASE_URL from '@/config';

export default {
  name: 'MainPage',
  components: {
    ProductFilter,
    ProductList,
    UiPagination,
  },
  data() {
    return {
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,

      page: 1,
      perPage: 3,

      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: null,
    };
  },
  created() {
    this.getProductsData();
  },
  watch: {
    page() {
      this.getProductsData();
    },
    filterPriceFrom() {
      this.getProductsData();
    },
    filterPriceTo() {
      this.getProductsData();
    },
    filterCategoryId() {
      this.getProductsData();
    },
    filterColor() {
      this.getProductsData();
    },
  },
  methods: {
    getProductsData() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.getProductsTimer);
      const params = {
        page: this.page,
        limit: this.perPage,
        categoryId: this.filterCategoryId,
        minPrice: this.filterPriceFrom,
        maxPrice: this.filterPriceTo,
        colorId: this.filterColor,
      };

      this.getProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, { params })
          .then((response) => this.productsData = response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false);
      });
    },
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
};
</script>

<style scoped></style>
