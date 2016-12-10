<script>
import router from '../router';

export default {
    data() {
        return {
            product: {
                id: '',
                title: '',
                shortDescription: '',
                fullDescription: '',
                price: 0,
                category: 0,
                image: '',
            }
        }
    },
    methods: {
        addProduct() {
            this.$store.dispatch('addProduct', this.product);
            alert('You add new product!');
        },
    },
    computed: {
        getCategories() {
            return this.$store.state.categories;
        },
    },
    created() {
        if(this.$store.state.user.isLogged != true) {
            router.push('/manage/login');
        }
    },
}
</script>

<template lang="html">
    <div class="container">
        <h2>Add Product</h2>
        <form @submit.prevent="addProduct()">
            <div class="row">
                  <div class="input-field col s6">
                    <input placeholder="Name" type="text" v-model="product.title">
                    <label for="">Name</label>
                  </div>
                  <div class="input-field col s6">
                    <input type="text" placeholder="Short description" v-model="product.shortDescription">
                    <label>Short description</label>
                  </div>
                  <div class="input-field col s12">
                      <textarea class="materialize-textarea" v-model="product.fullDescription" rows="8" cols="80" placeholder="Description"></textarea>
                      <label for="textarea1">Full description</label>
                  </div>
                  <div class="input-field col s12">
                      <input type="text" placeholder="Image url" v-model="product.image">
                      <label>Image url</label>
                  </div>
                  <div class="input-field col s4">
                      <input type="number" v-model="product.price">
                  </div>
                  <div class="input-field col s4">
                      <select  class="browser-default" name="" v-model="product.category">
                          <option :value="category.id" v-for="category in getCategories">{{category.name}}</option>
                      </select>
                  </div>
            </div>
            <button @click.prevent="addProduct()" class="waves-effect waves-light btn" type="submit">Add product</button>
        </form>
    </div>
</template>
