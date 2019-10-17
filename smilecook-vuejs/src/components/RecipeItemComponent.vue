<template>
  <div class="col-md-12">
    <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <!-- content block -->
      <div class="col p-4 d-flex flex-column position-static">
        <div class="row">
          <div class="col">
            <h3 class="mb-2">{{recipeItem.name}}</h3>
          </div>
          <div
            v-show="isAuthor() && isOwnPage()"
            class="col-2 badge"
          >
            <span
              v-if="!recipeItem.is_publish"
              class="badge badge-danger"
            >close</span>
            <span
              v-if="recipeItem.is_publish"
              class="badge badge-success"
            >open</span>
          </div>
        </div>

        <div class="row mb-auto mt-3">
          <div class="col-10">
            <p class="card-text">{{recipeItem.description}} </p>
            <p class="">...&nbsp;<router-link
                :to="{ name: 'recipe-detail', params: { recipeId: recipeItem.id }}"
                class="stretched-link"
              >See more</router-link>
            </p>
          </div>
        </div>

        <div class="mb-0 text-muted">Cooking in <strong>{{recipeItem.cook_time}}</strong> min(s) and offer <strong>{{recipeItem.num_of_servings}}</strong> people.</div>
      </div>

      <!-- img block -->
      <div class="col-4 d-none d-lg-block">
        <!-- <img :src="recipeItem.cover_url" :alt="recipeItem.name" class="img-fluid" /> -->
        <img
          style="overflow: hidden; width: 100%; height: 100%; background-position: center center; background-repeat: no-repeat; background-size: cover;"
          :style="{'background-image': 'url('+ recipeItem.cover_url + ')' }"
        />

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ActionTypes } from "@/store/aciton-types";
import { RecipeItem } from "@/response";

@Component({
  props: {
    recipeItem: Object
  }
})
export default class RecipeItemComponent extends Vue {
  isAuthor(): boolean {
    try {
      if (
        (<any>this.$store.state.userStore).profile.username ===
        this.$props.recipeItem.author.username
      ) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  isOwnPage(): boolean {
    if (this.$route.name === "my-recipes") {
      return true;
    }
    return false;
  }

  beforeMount() {}

  // ...mapGetters('userStore', {
  //   selfProfile: 'cartProducts',
  //   total: 'cartTotalPrice'
  // })
}
</script>
