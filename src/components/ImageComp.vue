<template>
    <!-- <div>
        <p>{{image.title}}</p>
    </div> -->
    <!-- <div class="row"> -->
        <!-- <router-link to='/detail'> -->
        <router-link :to="{ name: 'detail', params: { imageId: image.id }}">

            <div class="card" style="height: 400px;">
                <div class="mr-2 my-1" style="color: red; position: absolute; right:0;">
                    <font-awesome-icon :icon="['fas', 'trash']" />
                </div>
                <img 
                    class="img-fluid mx-auto my-3" 
                    v-bind:src="image.image"
                    alt="" 
                    width="150px"
                    height="auto"
                />
                <div 
                    class="card-body mx-auto align-text-bottom" 
                    style="height: 150px; position: absolute; margin-top: 250px"
                >
                    <button type="button" class="btn btn-outline-success btn-sm mx-1 my-1">fish - 80%</button>
                    <button type="button" class="btn btn-outline-success btn-sm mx-1 my-1">fish - 80%</button>
                    <button type="button" class="btn btn-outline-success btn-sm mx-1 my-1">fish - 80%</button>
                    <button type="button" class="btn btn-outline-success btn-sm mx-1 my-1">fish - 80%</button>
                    <button type="button" class="btn btn-outline-success btn-sm mx-1 my-1">fish - 80%</button>
                    <button type="button" class="btn btn-outline-success btn-sm mx-1 my-1">fish - 80%</button>
                    <!-- <p class="card-title">{{image.title}}</p> -->
                </div>
            </div>
        </router-link>
    <!-- </div> -->
</template>

<script>
export default {
    name: "ImageComp",
    props: ["image"]
}
</script>

<style scoped>

</style>