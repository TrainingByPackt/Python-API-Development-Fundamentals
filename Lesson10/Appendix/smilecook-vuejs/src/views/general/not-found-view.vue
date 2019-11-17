<template>
  <div class="row">
    <div class="col-12 text-center">

      <div class="">
        <h1 class="text-dark">Oops! 404 Not Found</h1>
        <div class="py-5 my-5">
          <strong>Sorry, the page you are looking for was not found!</strong>
        </div>
        <div class="py-5 my-5">

          <router-link
            :to="{name:'home'}"
            class="btn btn-primary glyphicon glyphicon-home"
          >Take Me Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="@/views/general/not-found-view.ts"></script>
