<script>
    import Pagination from './Pagination.vue';
    import ProductsListView from './ProductsListView.vue';

    export default {
        data() {
          return {
              itemsOnPage: 6,
              currentPage: 1,
              searchInCategories: '',
              price: 0,
          }
        },
        created() {
            this.$store.dispatch('getProducts', this.$route.params.id);
        },
        components: {
            Pagination,
            ProductsListView,
        },
        computed: {
            products() {
              return this.$store.state.products;
            },

            search() {
                return this.$store.state.search;
            },

            filteredProduts() {
                if(this.search == '') {
                    return this.products;
                } else {
                    return this.products.filter( product => (product.title.toLowerCase().search(this.search.toLowerCase()) != -1 ) );
                }
            },

            pageItems() {
                var start = (this.currentPage - 1) * this.itemsOnPage;
                return this.filteredProduts.slice(start, start + this.itemsOnPage);
            },

            filtrPrice() {
                let products = [];
                for (let product of this.products) {
                    if(product.price < this.price)
                        products.push(product);
                }
                return produts;
            }
        },
        methods: {
            changePage(page) {
                this.currentPage = page;
            }
        },
        watch: {
            '$route' (to, from) {
                this.currentPage = 1;
                this.$store.dispatch('doSearch', '');
                this.$store.dispatch('getProducts', to.params.id);
            }
        }
    }
</script>

<template>
  <div class="products container">

    <p>Ustaw cenę maksymalną:</p>
    <p class="range-field">
      <input type="range" v-model="price" id="test5" min="0" max="100" />
    </p>

    <pagination v-show="pageItems.length" @change-page="changePage" :items-on-page="itemsOnPage" :current-page="currentPage" :elements="filteredProduts.length"></pagination>

    <div class="row">
        <div class="col s4" v-for="(product, index) in pageItems">

            <products-list-view :product="product"></products-list-view>

        </div>
        <div class="row" v-show="!pageItems.length">
            <p>Brak produktow </p>
        </div>
    </div>

    <pagination v-show="pageItems.length" @change-page="changePage" :items-on-page="itemsOnPage" :current-page="currentPage" :elements="filteredProduts.length"></pagination>

  </div>
</template>
