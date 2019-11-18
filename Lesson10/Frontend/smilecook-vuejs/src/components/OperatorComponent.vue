<template>
  <div
    v-show="hasLogin"
    class="btn-group col-auto mt-auto mb-auto"
    role="group"
    aria-label="Basic example"
  >
    <button
      v-if="!recipe.is_publish"
      @click.stop="showPublishDialog()"
      class="btn btn-outline-success"
    >Publish</button>
    <button
      v-if="recipe.is_publish"
      @click.stop="showUnpublishDialog()"
      class="btn btn-outline-danger"
    >Unpublish</button>
    <router-link
      :to="{ name: 'edit-recipe' , params: { recipeId: recipe.id }}"
      class="btn btn-outline-warning"
    >Edit</router-link>
    <button
      @click.stop="showDeleteDialog()"
      class="btn btn-outline-danger"
    >Delete</button>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AlertItem, UserItem, RecipeItem } from "@/response";
import { ActionTypes } from "@/store/aciton-types";

@Component({
  props: {
    recipe: Object
  }
})
export default class OperatorComponent extends Vue {
  get user(): UserItem {
    try {
      if (this.hasLogin) {
        return this.$store.state.user;
      }
      throw Error;
    } catch (error) {
      return <UserItem>{};
    }
  }

  get hasLogin() {
    return (<any>this.$store.state).isLogin;
  }

  get recipeId() {
    return this.$props.recipe.id;
  }

  showPublishDialog() {
    this.$store.dispatch(ActionTypes.OPEN_DIALOG, {
      dialog: {
        show: true,
        title: "Confirm publish",
        msg: "Are you sure to change recipe status for publish?",
        hasConfirmButton: true,
        hasCancelButton: true,
        callback: this.publishRecipe
      }
    });
  }

  showUnpublishDialog() {
    this.$store
      .dispatch(ActionTypes.OPEN_DIALOG, {
        dialog: {
          show: true,
          title: "Confirm unpublish",
          msg: "Are you sure to change recipe status for unpublish?",
          hasConfirmButton: true,
          hasCancelButton: true,
          callback: this.unpublishRecipe
        }
      })
      .then(() => {
      });
  }

  showDeleteDialog() {
    this.$store.dispatch(ActionTypes.OPEN_DIALOG, {
      dialog: {
        show: true,
        title: "Confrim delete",
        msg: "Are you sure to delete?",
        hasConfirmButton: true,
        hasCancelButton: true,
        callback: this.deleteRecipe
      }
    });
  }

  publishRecipe() {
    this.$store
      .dispatch(ActionTypes.PUBLISH_RECIPE, { recipeId: this.recipeId })
      .then(() => {
        this.$store.dispatch(ActionTypes.CLOSE_DIALOG);
      });
  }

  unpublishRecipe() {
    this.$store
      .dispatch(ActionTypes.UNPUBLISH_RECIPE, { recipeId: this.recipeId })
      .then(() => {
        this.$store.dispatch(ActionTypes.CLOSE_DIALOG);
      });
  }

  deleteRecipe() {
    this.$store
      .dispatch(ActionTypes.DELETE_RECIPE, { recipeId: this.recipeId })
      .then(() => {
        this.$store.dispatch(ActionTypes.CLOSE_DIALOG);
        this.$router.replace({name: 'my-recipes'})
      });
  }

  beforeMount() {}
}
</script>
