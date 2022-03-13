<template>
  <UiFormField :title="title" :error="error">
    <textarea v-model="dataValue" :placeholder="placeholder"
              class="form__input form__input--area"></textarea>
  </UiFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  name: 'UiFormTextarea',
  mixins: [formFieldMixin],
};
</script>

<style scoped>

</style>
