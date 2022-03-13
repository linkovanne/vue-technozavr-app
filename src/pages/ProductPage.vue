<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">{{
              category.title
            }}</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">{{ product.title }}</a>
        </li>
      </ul>
    </div>

    <section v-if="productLoading">Получение данных о товаре...</section>
    <section v-if="productLoadingFailed">
      Не удалось получить данные о товаре...
      <button @click.prevent="getProduct()">Попробовать еще раз</button>
    </section>
    <section v-if="!productData">Такой товар не найден...</section>
    <section v-if="productData" class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570"
               :src="product.image.file.url"
               :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">{{ numberFormat }} ₽</b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li v-for="color in product.colors" :key="color.id" class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-item" :value="color.id">
                    <span class="colors__value" :style="{backgroundColor: color.code}"></span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <UiNumberInput v-model:productCount="productCount"/>

              <button class="button button--primery"
                      :disabled="productAddScene === 'adding'"
                      type="submit">В корзину</button>
            </div>
            <div v-show="productAddScene === 'done'">Товар добавлен в корзину</div>
            <div v-show="productAddScene === 'adding'">Добавляем товар в корзину...</div>
            <div v-show="productAddScene === 'error'">Товар не добавлен...</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">Описание</a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">Характеристики</a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">Гарантия</a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">Оплата и доставка</a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
            велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
            синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные
            отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и различные приложения
            сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал
            с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего
            74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из
            черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56
            мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и
            синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс
            и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень
            защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает
            кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import UiNumberInput from '@/components/UiNumberInput';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import API_BASE_URL from '@/config';
import { mapActions } from 'vuex';

export default {
  name: 'ProductPage',
  components: {
    UiNumberInput,
  },
  data() {
    return {
      productCount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAddScene: 'init',
    };
  },
  watch: {
    $route: {
      handler() {
        if (!this.$route.params.id) {
          return;
        }

        this.getProduct();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    getProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;

      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => this.productData = response.data)
        .catch(() => this.productLoadingFailed = true)
        .then(() => this.productLoading = false);
    },
    addToCart() {
      this.productAddScene = 'adding';

      this.addProductToCart({
        productId: this.product.id.toString(),
        quantity: this.productCount.toString(),
      })
        .then(() => this.productAddScene = 'done')
        .catch(() => this.productAddScene = 'error');
    },
  },
  computed: {
    product() {
      return this.productData ? this.productData : [];
    },
    category() {
      return this.productData ? this.productData.category : [];
    },
    numberFormat() {
      return numberFormat(this.product.price);
    },
  },
};
</script>

<style scoped></style>
