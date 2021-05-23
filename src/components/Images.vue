<template>
    <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 mb-3" v-for="image in images" v-bind:key="image.id">
            <ImageComp v-bind:image="image" />
        </div>
    </div>
</template>

<script>

import ImageComp from './ImageComp.vue';

export default {
    name: "Images",
    components: {
        ImageComp,
    },
    props: ["images"],
    
}
</script>

<style scoped>
    .image_list {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
    }
</style>