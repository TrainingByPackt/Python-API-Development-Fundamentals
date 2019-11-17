<template>
  <div class="row">
    <div class="col-md-auto ml-3 mr-3">
      <UploadAvatarComponent
        v-if="user.avatar_url !== ''"
        :imageUrl="user.avatar_url"
      />
    </div>

    <div class="col">
      <h4 class="text-white">Profile</h4>
      <p class="text-light mb-1">{{user.username}}</p>
      <p
        v-show="!!user.email"
        class="text-light mb-1"
      >{{user.email}}<small class="text-muted pl-5">join on {{user.created_at | formatDate}}</small></p>
    </div>

    <div class="col col-md-4 text-right mr-3">
      <ul
        class="list-unstyled"
        style="margin-bottom: 0px! important;"
      >
        <li style="padding: .15rem 0">
          <router-link
            :to="{ name: 'my-recipes' }"
            class="text-white"
          >My recipes</router-link>
        </li>
        <li style="padding: .15rem 0">
          <a
            @click.stop="logoutUser()"
            href="#"
            class="text-white"
          >Logout</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { ActionTypes } from "@/store/aciton-types";
import UploadAvatarComponent from "@/components/UploadAvatarComponent.vue";
import { UserItem } from "@/response";

@Component({
  components: {
    UploadAvatarComponent
  }
})
export default class ProfileComponent extends Vue {
  get user() {
    try {
      return this.$store.state.userStore.profile;
    } catch (error) {
      return <UserItem>{};
    }
  }

  logoutUser() {
    this.$store.dispatch(ActionTypes.LOGOUT).then(success => {
      console.log('logout success')
      this.$router.replace({ name: "login" });
    })
  }

  // Object.keys(this.$store.state.profile).length === 0
  beforeMount() {}
}
</script>
