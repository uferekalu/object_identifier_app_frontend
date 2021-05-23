<template>
    <div class="col-md-3 mb-3">
        <div class="card">
            <img 
                class="img-fluid" 
                v-bind:src="result.image"
                alt="" 
                width="300px"
                height="300px"
            />
            <div class="card-body">
                <p class="">{{result.labels}}</p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "ImageUpload",
    props: ["result"]
   
}
</script>

<style scoped>
    
</style>