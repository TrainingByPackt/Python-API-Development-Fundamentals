<template>
  <div class="row justify-content-center">
    <div class="col-10 blog-main">
      <div class="row pt-3 pb-3">
        <div class="col">
          <h1 class="blog-post-title">{{recipe.name}}</h1>
        </div>

        <OperatorComponent :recipe="recipe" />

        <div class="col-1 my-auto">
          <a
            @click.stop="toPreviousPage()"
            class="btn btn-outline-secondary"
          >back</a>
        </div>
      </div>

      <div class="row">
        <div class="col-3">
          <img
            width="100%"
            :src="recipe.cover_url"
          />
        </div>

        <!-- <div class="col mb-auto mt-auto">

          </div> -->

        <div class="col text-right my-auto">
          <p class="text-info">serving: {{recipe.num_of_servings}} people</p>
          <p class="text-info">cooking time: {{recipe.cook_time}} min(s)</p>
          <p class="blog-post-meta">
            last update on {{recipe.updated_at | formatDate}} by
            <router-link :to="{ name: 'author', params: { username: recipe.author.username }}">{{recipe.author.username}}</router-link>
          </p>
        </div>
      </div>

      <p v-if="!!recipe.description" class="my-5">{{recipe.description}} </p>

      <hr class="mt-5 mb-3">
      <h4>Ingredients</h4>
      <p v-if="!!recipe.ingredients">{{recipe.ingredients}}</p>
      <p
        v-else
        class="text-muted"
      >wait author to write something...</p>

      <hr class="mt-5 mb-3">
      <h4>Let do it</h4>
      <p v-if="!!recipe.directions">{{recipe.directions}}</p>
      <p
        v-else="!recipe.directions"
        class="text-muted"
      >wait author to write something...</p>

    </div>
  </div>
</template>

<script lang="ts" src="@/views/recipe/recipe-detail-view.ts"></script>
