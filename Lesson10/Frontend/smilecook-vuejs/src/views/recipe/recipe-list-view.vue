<template>
  <div class="row mb-2">
    <FilterComponent />

    <RecipeItemComponent
      v-for="recipeItem in recipes"
      :recipeItem="recipeItem"
      :key="recipeItem.id"
    />
    
    <FilterComponent :enableResult="false" :enableDisplay="false" :enableOrderBy="false" :enableSearch="false"/>
  </div>
</template>

<script lang="ts" src="@/views/recipe/recipe-list-view.ts">

</script>
