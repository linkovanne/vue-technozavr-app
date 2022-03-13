<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'cart'}" class="breadcrumbs__link">Корзина</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Оформление заказа</a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">
        {{ totalCount }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="createOrder()">
        <div class="cart__field">
          <div class="cart__data">
            <UiFormText
              v-model:value="formData.name" :error="formError.name"
              :title="'ФИО'" :placeholder="'Введите ваше полное имя'"
            />

            <UiFormText
              v-model:value="formData.address" :error="formError.address"
              :title="'Адрес доставки'" :placeholder="'Введите ваш адрес'"
            />

            <UiFormText
              v-model:value="formData.phone" :error="formError.phone" :type="'tel'"
              :title="'Телефон'" :placeholder="'Введите ваш телефон'"
            />

            <UiFormText
              v-model:value="formData.email" :error="formError.email" :type="'email'"
              :title="'Email'" :placeholder="'Введи ваш Email'"
            />

            <UiFormTextarea
              v-model:value="formData.comments" :error="formError.comments"
              :title="'Комментарий к заказу'" :placeholder="'Ваши пожелания'"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0"
                         checked="">
                  <span class="options__value">Самовывоз <b>бесплатно</b></span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">Курьером <b>500 ₽</b></span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">Картой при получении</span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">Наличными при получении</span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li v-for="product in products" :key="product.id" class="cart__order">
              <h3>{{ product.details.title }}</h3>
              <b>{{ numberFormat(product.price) }} ₽</b>
              <span>Артикул: {{ product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ totalCount }}</b> товара
              на сумму <b>{{ numberFormat(totalPrice) }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
          <div v-show="inProgress">Отправляем заказ...</div>
        </div>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>{{ formErrorMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import UiFormTextarea from '@/components/UiFormTextarea';
import UiFormText from '@/components/UiFormText';
import { mapGetters, mapMutations } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  name: 'OrderPage',
  components: {
    UiFormTextarea,
    UiFormText,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      inProgress: false,
    };
  },
  methods: {
    numberFormat(price) {
      return numberFormat(price);
    },
    createOrder() {
      this.inProgress = true;
      this.formError = {};

      axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((res) => {
          this.$router.push({
            name: 'orderInfo',
            params: { id: res.data.id },
          });

          this.resetCart();
          this.updateOrderInfo(res.data);
        })
        .catch((err) => {
          this.formError = err.response?.data?.error?.request || {};
          this.formErrorMessage = err.response?.data?.error?.message || '';
        })
        .then(() => this.inProgress = false);
    },
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailedProducts',
      totalPrice: 'cartTotalPrice',
      totalCount: 'cartTotalQuantity',
    }),
    ...mapMutations({
      resetCart: 'resetCart',
      updateOrderInfo: 'updateOrderInfo',
    }),
  },
};
</script>

<style scoped></style>
