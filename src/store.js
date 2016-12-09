import Vue from 'vue';
import Vuex from 'vuex';
import * as request from './request';

Vue.use(Vuex);

const store = new Vuex.Store({
    debug: true,
    state: {
        products: [],
        product: [],
        categories: [],
        search: '',
        cart: []
    },

    mutations: {
        PRODUCTS_GET (state, products) {
            state.products = products;
        },

        PRODUCT_GET (state, product) {
            state.product = product;
        },

        PRODUCT_ADD (state) {
            alert('produkt zostal dodany');
        },

        PRODUCT_DELETE (state) {
            alert('produkt zostal usuniety');
        },

        CATEGORIES_GET (state, categories) {
            state.categories = categories;
        },

        SEARCH (state, search) {
            state.search = search;
        },

        GET_CATEGORY_PRODUCTS (state, products) {
            state.products = products;
        },

        ADD_TO_CART (state, product) {
            state.cart.push(product);
        }
    },

    actions: {
        getProducts (store, id) {
            request.getProducts().then((response) => {
                if (!response.error) {
                    if(id) {
                        var products = response.body.filter(product => (product.category == id));
                        store.commit('PRODUCTS_GET', products);
                    } else {
                        store.commit('PRODUCTS_GET', response.body);
                    }
                }
            });
        },

        getProduct (store, id) {
            request.getProduct(id).then((response) => {
                if (!response.error) {
                    store.commit('PRODUCT_GET', response.body);
                }
            });
        },

        addProduct (store, product) {
          var _this = this;
          request.addProduct(product).then((response) => {
              if(!response.error) {
                  store.commit('PRODUCT_ADD');
              }
          });
        },

        deleteProduct (store, id) {
            request.deleteProduct(id).then((response) => {
                if(!response.error) {
                  store.commit('PRODUCT_DELETE');
                }
            });
        },

        getCategories (store) {
            request.getCategories().then((response) => {
              if(!response.error) {
                  store.commit('CATEGORIES_GET', response.body);
              }
            });
        },

        getCategoryProducts (store, category_id) {
            request.getCategoryProducts(category_id).then((response) => {
                if(!response.error) {
                    var products = response.data;
                    console.log(products);
                    store.commit('GET_CATEGORY_PRODUCTS', response.body);
                }
            });
        },

        doSearch (store, text) {
            store.commit('SEARCH', text);
        },

        addToCart(store, product) {
            store.commit('ADD_TO_CART', product);
        }
    }
});

export default store;
