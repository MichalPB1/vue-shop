<script>
    import Product from './Product.vue';
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
            'product': Product,
            'pagination': Pagination,
            'products-list-view': ProductsListView,
        },
        computed: {
            products() {
              return this.$store.state.products;
            },

            search() {
                return this.$store.state.search;
            },

            filteredProduts() {
                if(this.search == '')
                    return this.products;
                else {
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
        //     addProduct() {
        //         this.$store.dispatch('addProduct', {
        //             "id": 9,
        //             "title": "Testttt",
        //             "shortDescription": "Great products to make your grill taste better than ever!",
        //             "fullDescription": "<p>A bounch of elements that will help you with your grill and much more! Great products to make your grill taste better than ever!</p>",
        //             "price": 10,
        //             "category": 4,
        //             "image": "https://s7d1.scene7.com/is/image/BedBathandBeyond/259381208148c?$229$",
        //             "reviews": [
        //                 {
        //                     "authorName": "Randy A. Ruffin",
        //                     "authorImage": "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg",
        //                     "description": "Not bad but with this price... Think twice!",
        //                     "rating": 3
        //                 }
        //             ]
        //         });
        //     },

            deleteProduct(id) {
                this.$store.dispatch('deleteProduct', id);
            },

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

    <!-- <a @click.prevent="addProduct" class="btn-floating btn-large waves-effect waves-light red">
      <i class="material-icons">+</i></a> -->

  </div>
</template>
