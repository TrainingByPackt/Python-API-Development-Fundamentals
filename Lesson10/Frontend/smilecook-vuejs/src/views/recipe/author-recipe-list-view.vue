<template>
  <div class="row mb-2">
    <div class="col-md-12 pb-3 pl-3 pr-3">
      <h2>Author</h2>
    </div>

    <AuthorComponent :username="username" />

    <div class="col-md-12 pt-5">
      <h2>His creation</h2>
    </div>

    <AuthorFilterComponent :username="username" />

    <RecipeItemComponent
      v-for="recipeItem in recipes"
      :recipeItem="recipeItem"
      :key="recipeItem.id"
    />

    <AuthorFilterComponent
      :username="username"
      :enableResult="false"
      :enableDisplay="false"
      :enableVisibility="false"
    />
  </div>
</template>

<script lang="ts" src="@/views/recipe/author-recipe-list-view.ts"></script>
