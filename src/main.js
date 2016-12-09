import Vue from 'vue';
import store from './store';
import router from './router';

import CategoryMenu from './components/CategoryMenu.vue';
import Cart from './components/Cart.vue';

// Code here
const app = new Vue({
    data: {
        search: '',
    },

    components: {
        'category-menu': CategoryMenu,
        'cart': Cart
    },

    methods: {
        doSearch() {
            if(this.$route.path != '/products')
                router.push('/products');

            this.$store.dispatch('doSearch', this.search);
        },

        clearSearch() {
            this.search = '';
            this.doSearch();
        }
    },
    router,
    store
}).$mount('#app');
