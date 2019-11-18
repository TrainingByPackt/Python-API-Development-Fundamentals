<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <h4
        v-if="mode === 'create'"
        class="py-3 text-center"
      >Create recipe</h4>
      <h4
        v-if="mode === 'edit'"
        class="py-3 text-center"
      >Edit recipe</h4>

      <form
        class="needs-validation"
        novalidate=""
      >
        <div class="row py-3">
          <div class="col">
            <label for="name">Name</label>
            <input
              v-model="inputItem.name"
              type="text"
              class="form-control"
              id="name"
              :class="{'is-invalid': !nameValidated}"
            />
            <div
              v-show="!nameValidated"
              class="invalid-feedback"
            >
              Please enter name.
            </div>
          </div>
        </div>

        <div class="row py-3">
          <div class="col">
            <label for="description">Description</label>
            <textarea
              v-model="inputItem.description"
              type="text"
              class="form-control"
              id="description"
              placeholder=""
            />
            </div>
        </div>

        <div class="row py-3">
          <div class="col-6">
            <label for="num_of_servings">Number of servings</label>
            <input v-model="inputItem.num_of_servings"  type="text" class="form-control" id="num_of_servings" placeholder="" :class="{'is-invalid': !numOfServingsValidated}"/>
            <div v-show="!numOfServingsValidated" class="invalid-feedback">
              Please enter number of servings.
            </div>
          </div>

          <div class="col">
            <label for="cook_time">Cook time</label>
            <input v-model="inputItem.cook_time" type="text" class="form-control" id="cook_time" placeholder="" :class="{'is-invalid': !cookTimeValidated}"/>
            <div v-show="!cookTimeValidated" class="invalid-feedback">
              Please enter cook_time.
            </div>
          </div>
        </div>

        <div class="row py-3">
          <div class="col">
            <label for="ingredients">Ingredients</label>
            <textarea v-model="inputItem.ingredients" type="text" class="form-control" id="ingredients" placeholder=""/>
          </div>
        </div>

        <div class="row py-3">
          <div class="col">
            <label for="directions">Directions</label>
            <textarea v-model="inputItem.directions" type="text" class="form-control" id="directions" placeholder=""/>
          </div>
        </div>

        <hr class="mb-4 col ">

        <div class="row py-3">
          <div class="col">
            <label for="cover">Cover image</label>

            <div class="image-container">
              <img
                v-show="!isUpload"
                class="img-fluid"
                :src="originImage"
              />
              <img
                v-show="isUpload"
                class="img-fluid"
                :src="newImage"
              />
              <div class="centered">Preview</div>
            </div>
            <div class="custom-file mt-2">
              <input
                type="file"
                class="custom-file-input"
                id="validatedCustomFile"
                :class="{'is-invalid': !imageValidated, 'is-valid': isUpload && imageValidated}"
                @change="onImageChange($event)"
              >

              <label
                class="custom-file-label"
                for="validatedCustomFile"
              >{{imageName}}</label>
              <div
                v-show="!imageValidated"
                class="invalid-feedback"
              >
                Please choose valid image.
              </div>
              <div
                v-show="isUpload && imageValidated"
                class="valid-feedback"
              >
                Looks good!
              </div>
            </div>
          </div>
        </div>

        <hr class="mb-4 col">

        <div class="row pb-5 justify-content-center">
          <div class="col-8">
            <button @click.stop="checkForm()" class="btn btn-primary btn-lg btn-block" type="button">submit</button>
          </div>
        </div>
      </form>
    </div>
    <!-- <div style="position:fixed; bottom:0px;width: 100%;">
      <div class="progress" style="border-radius: 1rem!important; height: 0.5rem!important">
        <div class="progress-bar bg-success" :class="{uploading : true}" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" src="@/views/author/recipe-panel-view.ts"></script>


<style>
.image-container {
  position: relative;
  text-align: center;
}
.image-container:hover > img {
  opacity: 0.5;
}

.image-container:hover > .centered {
  display: block;
}

.centered {
  color: black;
  font-size: x-large;
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>