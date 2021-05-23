<template>
    <!-- <div>
        <p>{{image.title}}</p>
    </div> -->
    <!-- <div class="row"> -->
        <!-- <router-link to='/detail'> -->
        <!-- <router-link :to="{ name: 'detail', params: { imageId: image.id }}"> -->


            <div class="card" v-if="showInDOM" style="height: 400px;">
                <div class="mr-2 my-1" style="color: red; position: absolute; right:0; bottom:0">
                    <button class="btn btn-sm btn-outline-danger" v-on:click="deleteItem()">
                        <span v-if="deleting">
                            <font-awesome-icon :icon="['fas', 'spinner']" />
                        </span>
                        <span v-else>
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </span>
                    </button>
                    
                </div>
                
                <img 
                    class="img-fluid mx-auto my-3" 
                    v-bind:src="image.url"
                    alt="" 
                    width="200px"
                    height="auto"
                />
                <div 
                    class="card-body mx-auto align-text-bottom" 
                    style="height: 150px; position: absolute; margin-top: 250px"
                >

                    <div class="col-12" v-for="obj in objectsArray" v-bind:key="obj">
                        <b-badge class="btn btn-outline-success badge-success btn-sm mr-1">{{ obj }}</b-badge>
                    </div>
                </div>
            </div>
        <!-- </router-link> -->
    <!-- </div> -->
</template>

<script>
import axios from 'axios'
export default {
    name: "ImageComp",
    props: ["image"],


    data() {
        return {
            deleting: false,
            objectsArray: [],
            showInDOM: true
        }
    },

    mounted () {
        var imageObjects = this.image.imgObjects
        // API returns a string with trailing comma, trim off!
        imageObjects = imageObjects.replace(/,\s*$/, "");
        if (imageObjects && imageObjects.length > 0) {
            const objArray = imageObjects.split(',')
            this.objectsArray = objArray
        }
    },

    methods: {
        deleteItem() {
            const query = `mutation deleteImage {
                            deleteImage(
                              id: ${this.image.id}
                            ) {
                              ok
                            }
                          }`
            
            let formData = new FormData();
            formData.append('query', query);
            this.deleting = true;
            axios.post('https://django-graphql-imageid.ew.r.appspot.com/graphql/', formData,
                {
                    headers: {
                        'Content-Type': 'application/graphql',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            )
            .then(response => {
                this.deleting = false;
                this.showInDOM = false;
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>

</style>