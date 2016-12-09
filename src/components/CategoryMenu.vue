<script>
export default {
    props: {
        showAsMenu: {
            type: Boolean,
            default: true
        }
    },
    created() {
        this.$store.dispatch('getCategories');
    },
    computed: {
        getCategories() {
            return this.$store.state.categories;
        },
        currentCategory() {
            return this.$route.params.id || 0;
        }
    }
}
</script>

<template lang="html">
  <ul :class="{tabs: showAsMenu, 'tabs-transparent': showAsMenu}">
    <li class="tab">
        <router-link :class="{active: (currentCategory == 0)}" to="/products">
            All categories
        </router-link>
    </li>
    <li :class="{tab: showAsMenu}" v-for="category in getCategories">
        <router-link :class="{active: (currentCategory == category.id)}" :to="'/products/' + category.id">
            {{ category.name }}
        </router-link>
    </li>
  </ul>
</template>
