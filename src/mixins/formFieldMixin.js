import UiFormField from '@/components/UiFormField';

export default {
  components: {
    UiFormField,
  },
  props: ['title', 'error', 'placeholder', 'value'],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('update:value', value);
      },
    },
  },
};
