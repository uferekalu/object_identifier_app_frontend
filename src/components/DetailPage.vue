<template>
    <div class="container">
        <b-alert show class="photo-heading"> Object Identifier</b-alert>
        <div class="col-md-3 mb-3">
            <div class="card">
                <img 
                    class="img-fluid" 
                    alt="" 
                    width="300px"
                    height="300px"
                />
                <div class="card-body">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DetailPage',
    props: ["detailInfo"]
}
</script>

<style scoped>

</style>

// v-bind:src="detailInfo.image"
// <p class="">{{detailInfo.title}}</p>