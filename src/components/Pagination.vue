<script>
export default {
    props: ['itemsOnPage', 'currentPage', 'elements'],

    computed: {
      pages() {
        return this.countPages();
      }
    },

    methods: {
      countPages() {
          return Math.ceil(this.elements / this.itemsOnPage);
      },

      changePage(page) {

        if(page <= 0) {
            this.$emit('change-page', 1);
        } else if(page > this.countPages()) {
            this.$emit('change-page', this.countPages());
        } else {
            this.$emit('change-page', page);
        }
        
      },
    }
}
</script>

<template lang="html">
  <div class="row">
    <ul class="pagination">
      <li class="waves-effect" :class="{ disabled: (currentPage == 1) }"><a @click.prevent="changePage(currentPage - 1)"><i class="material-icons">chevron_left</i></a></li>
      <li class="waves-effect" :class="{ active: (currentPage == page) }" v-for="page in pages"><a @click.prevent="changePage(page)">{{page}}</a></li>
      <li class="waves-effect" :class="{ disabled: (currentPage == countPages()) }"><a @click.prevent="changePage(currentPage + 1)"><i class="material-icons">chevron_right</i></a></li>
    </ul>
  </div>
</template>
