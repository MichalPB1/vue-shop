<script>
export default {
    computed: {
        cart() {
            return this.$store.state.cart;
        }
    }
}
</script>

<template lang="html">
    <div class="cart">
        <div class="cart_inside">
            <i class="large material-icons">shopping_cart</i>
            Cart:
            <span v-if="!cart.length && cart.length == 0">empty</span>
            <span v-else-if="cart.length == 1">{{ cart.length }} product</span>
            <span v-else>{{ cart.length }} products</span>
        </div>
    </div>
</template>
