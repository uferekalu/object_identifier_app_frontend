<template>
  <div class="container">

    <div class="mb-3">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand class="m-auto" href="#">Object Identifier With Google Vision API</b-navbar-brand>

      </b-navbar>
    </div>


    <section v-if="success">
      <b-alert show class="alert-success"> Image upload successful!</b-alert>
    </section>
    <section v-if="empty">
      <b-alert show class="alert-danger"> You must select an image to upload!</b-alert>
    </section>
    <section v-if="uploadError">
      <b-alert show class="alert-danger"> No Face Detected! Please Upload an Image with a face!</b-alert>
    </section>

    <div class="row col-12">
        <div class="card mx-auto justify-content-center">
          <h5 class="row col-12 my-3 align-items-center justify-content-center">Upload an Image to Analyse</h5>
          <div class="row col-12 my-3 align-items-center justify-content-center mx-auto">
              <label>
                  <input 
                    class="btn btn-success" 
                    type="file" 
                    id="file" ref="file" v-on:change="handleFileUpload()"/>
              </label>
              <div class="row col-12 my-3 align-items-center justify-content-center">
                <button type="button" class="btn btn-primary btn-md" v-on:click="submitFile()">
                  <span v-if="uploading">
                    <font-awesome-icon :icon="['fas', 'spinner']" /> 
                    <span>Uploading...</span>
                  </span>
                  <span v-else>
                    <font-awesome-icon :icon="['fas', 'upload']" />
                    <span>Upload</span>
                  </span>
                </button>
              </div>
          </div>
        </div>
    </div>

    <div aria-label="breadcrumb" class="mt-5">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active justify-content-center align-items-center" aria-current="page">
          <span class="text-dark font-weight-bold justify-content-center align-items-center mx-auto">Images with Detected Objects</span>
        </li>
      </ol>
    </div>
    
    <section v-if="error">
      <p>Sorry, your request could not be completed!</p>
    </section>

    <section v-else>
      <div v-if="loading" class="col-3 card mx-auto py-5">
        <span class="mx-auto">
          <font-awesome-icon :icon="['fas', 'spinner']" /> Loading...
        </span>
      </div>

      <div v-else>
        <Images v-bind:images="images" />
      </div>

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
        images: [],
        loading: false,
        uploading: false,
        error: false,
        uploadError: false,
        success: false,
        empty: false
    }
  },
  mounted () {
    this.loading = true;
    axios
      .get('https://django-graphql-imageid.ew.r.appspot.com/graphql/?query=query getImages {images {id image url imgObjects}}', )
      .then(response => {
          this.images = response.data.data.images
      })
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
        
            if (!this.file) {
              this.empty = true
              return
            }
            this.empty = false
            // Add the form data we need to submit
            formData.append('image', this.file);
            const query = `mutation createImage {
                            createImage(
                              image: ""
                            ) {
                              ok 
                              id 
                            }
                          }`
            formData.append('query', query);
            this.uploading = true
            axios.post('https://django-graphql-imageid.ew.r.appspot.com/graphql/',
                formData,
                {
                headers: {
                    'Content-Type': 'application/graphql',
                    'Content-Transfer-Encoding': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
              }
            )
            .then(response => {
              console.log(response)
              if(response.data.errors) 
                this.uploadError = true
              else
                this.success = true
            })            
            .catch(error => {
                console.log(error)
                this.error = true
            })
            .finally(() => this.uploading = false)
        
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