<template>
  <div class="row mb-2">
    <div class="col-md-12 pb-2"><h2>Your creation</h2></div>

    <AuthorFilterComponent :username="username" />
    <RecipeItemComponent
      v-for="recipeItem in recipes"
      :recipeItem="recipeItem"
      :key="recipeItem.id"
    />
    <AuthorFilterComponent :username="username" :enableResult="false" :enableDisplay="false" :enableVisibility="false"/>
  </div>
</template>

<script lang="ts" src="@/views/author/my-recipe-list-view.ts"></script>
