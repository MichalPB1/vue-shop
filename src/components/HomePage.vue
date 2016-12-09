
<script>
export default {
    created() {
        this.$store.dispatch('getCategories');
    },
    computed: {
        categories() {
            return this.$store.state.categories;
        }
    }
}
</script>

<template lang="html">
    <div class="container">
        <h3>Strona głowa</h3>
    </div>
</template>
