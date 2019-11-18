<template>
  <div class="row">
    <div class="col-12 text-center">

      <div class="">
        <h1 class="text-dark">500 Internal Server Error</h1>
        <div class="py-5 my-5">
          <strong>Sorry, something just isn't right!</strong>
        </div>
        <div class="py-5 my-5">

          <router-link :to="{name:'home'}" class="btn btn-primary glyphicon glyphicon-home" >Take Me Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="@/views/general/internal-server-error-view.ts"></script>
