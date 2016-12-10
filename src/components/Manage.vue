<script>
    import router from '../router';
    import Pagination from './Pagination.vue';
    import ProductsListView from './ProductsListView.vue';

    export default {
        data() {
          return {
              itemsOnPage: 6,
              currentPage: 1,
          }
        },
        created() {
            if(this.$store.state.user.isLogged != true) {
                router.push('/manage/login');
            }
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
            pageItems() {
                var start = (this.currentPage - 1) * this.itemsOnPage;
                return this.products.slice(start, start + this.itemsOnPage);
            },
        },
        methods: {
            deleteProduct(id) {
                this.$store.dispatch('deleteProduct', id);
                this.$store.dispatch('getProducts', this.$route.params.id);
            },

            changePage(page) {
                this.currentPage = page;
            }
        },
    }
</script>

<template lang="html">
    <div class="container">
        <h1>Manage page</h1>
        <pagination v-show="pageItems.length" @change-page="changePage" :items-on-page="itemsOnPage" :current-page="currentPage" :elements="products.length"></pagination>

        <div class="row">
            <div class="col s4" v-for="(product, index) in pageItems">

                <products-list-view @delete="deleteProduct(product.id)" :product="product" :admin="true"></products-list-view>

            </div>
            <div class="row" v-show="!pageItems.length">
                <p>Brak produktow </p>
            </div>
        </div>

        <pagination v-show="pageItems.length" @change-page="changePage" :items-on-page="itemsOnPage" :current-page="currentPage" :elements="products.length"></pagination>

    </div>
</template>
