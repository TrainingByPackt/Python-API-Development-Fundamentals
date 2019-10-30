<template>
  <div class="col-md-12">
    <div class="media">
      <img
        class="mr-5"
        style="overflow: hidden; width: 120px; height: 120px; background-position: center center; background-repeat: no-repeat; background-size: cover;"
        :style="{'background-image': backgroundImage }"
      />
      <!-- <img width="100px" height="100px" :src="author.avatar_url" class="mr-3" alt=""> -->
      <div class="media-body">
        <h3 class="mt-0">{{author.username}}</h3>
        <p class="text-muted">join smilecook on {{author.created_at | formatDate}}.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { ActionTypes } from "@/store/aciton-types";
import { UserItem } from "@/response";

@Component({
  props: {
    username: String
  }
})
export default class AuthorComponent extends Vue {
  get author(): UserItem {
    try {
      return (<any>this.$store.state).userStore.author;
    } catch (e) {
      return <UserItem>{};
    }
  }

  get backgroundImage(): string {
    if (!!this.author.avatar_url) {
      return "url('" + this.author.avatar_url + "')";
    } else {
      return "";
    }
  }

  beforeMount() {
    this.$store.dispatch(ActionTypes.GET_AUTHOR, {
      username: this.$props.username
    });
  }
}
</script>
