<script>
export default {
    props: ['product'],

    filters: {
        cutString(value) {
            return value.substring(0, 60) + '...';
        }
    },

    methods: {
        addToCart(product) {
            this.$store.dispatch('addToCart', product);
            Materialize.toast('You added product to cart!', 4000)
        }
    }
}
</script>

<template lang="html">
    <div class="card sticky-action">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" :src="product.image">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">
            <router-link :to="'/product/' + product.id ">{{ product.title }}</router-link>
<i class="material-icons right">more_vert</i></span>
        <p>{{ product.shortDescription | cutString }}</p>
      </div>
      <div class="card-action">
        <router-link :to="'/product/' + product.id ">Zobacz</router-link>
        <a @click.prevent="addToCart(product)">Dodaj do koszyka</a>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">{{ product.title }}<i class="material-icons right">close</i></span>
        <div class="chip">
            Kategoria: {{ product.category }}
        </div>
        <p v-html="product.fullDescription"></p>
      </div>
    </div>
</template>
