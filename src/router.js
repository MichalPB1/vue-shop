import Vue from 'vue';
import VueRouter from 'vue-router';

import ProductsList from './components/ProductsList.vue';
import Product from './components/Product.vue';
import HomePage from './components/HomePage.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: ProductsList},
        { path: '/products', component: ProductsList },
        { path: '/products/:id', component: ProductsList },
        { path: '/product/:id', component: Product },
        { path: '/category/:id', component: ProductsList },
    ]
});


export default router;
