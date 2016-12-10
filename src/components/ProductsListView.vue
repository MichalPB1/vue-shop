<script>
export default {
    props: {
        admin: {
            type: Boolean,
            default: false
        },
        product: {

        }
    },
    filters: {
        cutString(value) {
            return value.substring(0, 60) + '...';
        },
        cutName(value) {
            return value.substring(0, 20) + '...';
        }
    },

    methods: {
        addToCart(product) {
            this.$store.dispatch('addToCart', product);
            Materialize.toast('You added product to cart!', 4000)
        },
        deleteProduct() {
            this.$emit('delete');
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
            <router-link :to="'/product/' + product.id ">{{ product.title | cutName }}</router-link>
<i class="material-icons right">more_vert</i></span>
        <p>{{ product.shortDescription | cutString }}</p>
      </div>
      <div class="card-action">
        <router-link :to="'/product/' + product.id ">Zobacz</router-link>
        <a @click.prevent="addToCart(product)" v-show="!admin">Dodaj do koszyka</a>
        <a @click.prevent="deleteProduct()" v-show="admin">Usun</a>
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
