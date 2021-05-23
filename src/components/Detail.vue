<template>
    <section v-if="error">
      <p>Sorry, your request could not be completed!</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <!-- <div class="row col-12"> -->
        <DetailPage v-bind:detailInfo="detailInfo" />
    </section>
</template>

<script>

import DetailPage from './DetailPage.vue';

export default {
    name: "Detail",
    props: ["image"],
    components: {
        DetailPage
    },
    data() {
        return {
            detailInfo: null,
            loading: false,
            error: false
        }
    },
    mounted () {
        console.log("Route Params - " + this.$route.params)
        const API_BASE_URL = `https://fakestoreapi.com/products`;
        const fetchProduct = async () => {
            this.loading = true
            this.error = false

            try {
                const result = await axios.get(`https://fakestoreapi.com/products/${image.id}`);
                console.log(result.data)
                this.detailInfo = result.data
            } catch(error) {
                this.error = true
            }
            this.loading = false
        }
        // Call the API
        fetchProduct()
    }
}
</script>

<style scoped>

</style>