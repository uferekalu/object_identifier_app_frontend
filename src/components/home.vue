<template>
  <div id="app" class="container">

    <b-alert show class="photo-heading"> Object Identifier</b-alert>
    <div class="row col-12">
        <!-- <h3 class="photo-heading">Manage Photos</h3> -->
        <!-- <button type="button" class="btn btn-primary btn-md mb-5">Upload Photo</button> -->
        <div class="card mx-auto justify-content-center">
          <h5 class="row col-12 my-3 align-items-center justify-content-center">Upload an Image to Label</h5>
          <div class="row col-12 my-3 align-items-center justify-content-center mx-auto">
              <label>
                  <input 
                    class="btn btn-success" 
                    type="file" 
                    id="file" ref="file" v-on:change="handleFileUpload()"/>
              </label>
              <div class="row col-12 my-3 align-items-center justify-content-center">
                <button type="button" class="btn btn-primary btn-md" v-on:click="submitFile()"><font-awesome-icon :icon="['fas', 'upload']" /> Upload</button>
              </div>
          </div>
        </div>
    </div>
    <h5 class="mb-3 mt-3">Images</h5>
    
    <section v-if="error">
      <p>Sorry, your request could not be completed!</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <!-- <div class="row col-12"> -->
        <Images v-bind:info="info" />
      <!-- </div> -->

      <ImageUpload v-bind:result="result" />
      <!-- <div
        v-else
        v-for="currency in info"
        class="currency"
        v-bind:key="currency.id"
      >
        {{ currency.description }}:
        <span class="lighten">
          <span v-html="currency.symbol"></span>{{ currency.price | currencydecimal }}
        </span>
      </div> -->

    </section>
</div>
</template>

<script>
import axios from 'axios'
import Images from '@/components/Images';
import ImageUpload from '@/components/ImageUpload';

export default {
  name: 'home',
  components: {
    Images,
    ImageUpload,
  },
  data() {
    return {
        file: '',
        result: '',
        info: [],
        loading: true,
        error: false
    }
  },
  filters: {
    currencydecimal (value) {
      return value.toFixed(2)
  }
  },
  mounted () {
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => (this.info = response.data))
      .catch(error => {
        console.log(error)
        this.error = true
      })
      .finally(() => this.loading = false)
  },
  
  methods: {
    //   Submits the file to the server
      submitFile(){
        // Initialize the form data
            let formData = new FormData();
        // Add the form data we need to submit
            formData.append('file', this.file);

            axios.post( '/single-file',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            )
            .then(response => (this.result = response.data))
            .catch(error => {
                console.log(error)
                this.error = true
            })
            .finally(() => this.loading = false)
        
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>