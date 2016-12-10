import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

import ProductsList from './components/ProductsList.vue';
import Product from './components/Product.vue';
import HomePage from './components/HomePage.vue';
import Manage from './components/Manage.vue';
import LoginPage from './components/LoginPage.vue';
import AddProduct from './components/AddProduct.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: ProductsList},
        { path: '/products', component: ProductsList },
        { path: '/products/:id', component: ProductsList },
        { path: '/product/:id', component: Product },
        { path: '/category/:id', component: ProductsList },
        { path: '/manage/login', component: LoginPage },
        { path: '/manage', component: Manage },
        { path: '/manage/add', component: AddProduct }
    ]
});


export default router;
