<script>
  import { getRelatedProducts } from '../request.js';
  import ProductsListView from './ProductsListView.vue';

  export default {
    data() {
        return {
            relatedProductsArr: []
        }
    },
    components: {
        ProductsListView,
    },
    computed: {
      product() {
          return this.$store.state.product;
      },
      countRating() {
          let rate = 0;

          for (let review of this.product.reviews) {
              rate += review.rating;
          }

          return Math.round(rate / this.product.reviews.length).toFixed(1) ;
      }
    },
    methods: {
      getProduct() {
          this.$store.dispatch('getProduct', this.$route.params.id);
      },
      changeTabs(id) {
          $('ul.tabs').tabs('select_tab', 'test' + id);
      },
      relatedProducts() {
          getRelatedProducts(this.$route.params.id).then((response) => {
              if(!response.error) {
                  this.relatedProductsArr = response.body;
              }
          });
      },
      addToCart(product) {
          this.$store.dispatch('addToCart', product);
          Materialize.toast('You added product to cart!', 4000)
      }
    },
    created() {
      this.getProduct();
      this.relatedProducts();

      $(document).ready(function(){
        $('.materialboxed').materialbox();
      });
    },
    filters: {
        cutString(value) {
            if(value.length > 200) {
                return value.substring(0, 150) + '...';
            } else {
                return value;
            }
        }
    },
  }
</script>

<template>
  <div class="product container">
      <div class="row">
          <div class="col s4">
            <img class="materialboxed responsive-img" :src="product.image" :alt="product.title">
          </div>
          <div class="col s8">
              <div class="col s12">
                  <h2>{{ product.title }}</h2>
                  <p>Cena: <b>{{ product.price }}$</b> <span v-if="product.reviews">| Ocen: <b>({{ countRating }})</b></span></p>
              </div>
              <div class="col s12" v-html="product.fullDescription"></div>
              <div class="col s12">
                  <a class="waves-effect waves-light red btn" @click.prevent="addToCart(product)"><i class="material-icons left">add</i>Add to cart</a>
              </div>
          </div>
      </div>
      <div class="row reviews" v-if="product.reviews && product.reviews.length > 0">
          <div class="divider"></div>

          <h3>Reviews</h3>
          <div class="col s12 m6"  v-for="review in product.reviews">
            <div class="card horizontal">
              <div class="card-image">
                <img :src="review.authorImage">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <p>{{ review.description | cutString }} - <i>{{ review.authorName }} <b>({{ review.rating }})</b></i></p>
                </div>
              </div>
            </div>
          </div>
      </div>

      <div class="row related_products" v-if="product.reviews">
          <div class="divider"></div>

          <h3>Related products</h3>
          <div class="col s4" v-for="product in relatedProductsArr">
              <products-list-view :product="product"></products-list-view>
          </div>

      </div>

  </div>
</template>
