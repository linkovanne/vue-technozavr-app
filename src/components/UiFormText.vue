<template>
  <UiFormField :title="title" :error="error">
    <input class="form__input" v-model="dataValue"
           :type="type" :placeholder="placeholder">
  </UiFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  name: 'UiFormText',
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formFieldMixin],
};
</script>

<style scoped>

</style>
