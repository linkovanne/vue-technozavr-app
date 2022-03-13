<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
         :class="{'pagination__link--disabled': page === 1}"
         aria-label="Предыдущая страница"
         href="#"
         @click.prevent="paginate(page-1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li v-for="pageIndex in pages" :key="pageIndex" class="pagination__item">
      <a class="pagination__link"
         :class="{'pagination__link--current' : pageIndex === page}"
         href="#"
         @click.prevent="paginate(pageIndex)"
      >
        {{ pageIndex }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
         :class="{'pagination__link--disabled': page === pages}"
         href="#"
         aria-label="Следующая страница"
         @click.prevent="paginate(page+1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'UiPagination',
  props: ['page', 'count', 'perPage'],
  emits: ['update:page'],
  methods: {
    paginate(page) {
      if (page < 1 || page > this.pages) {
        return;
      }

      this.$emit('update:page', page);
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
};
</script>

<style scoped>

</style>
