<template>
  <div
    class="avatar-container"
    v-show="!!imageUrl"
  >

    <img
      style="overflow: hidden; width: 7rem; height: 7rem; background-position: center center; background-repeat: no-repeat; background-size: cover;"
      :style="{'background-image': backgroundImage }"
    />
    <i class="fas fa-upload"></i>
    <input
      type="file"
      @change="onImageChange($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { ActionTypes } from "@/store/aciton-types";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  props: {
    imageUrl: String
  }
})
export default class UploadAvatarComponent extends Vue {
  isUploading: boolean = false;

  // @Watch('imageUrl')
  // imageChange (newVal: any, oldVal: any) {
  //   this.imageUrl = this.$store.state.profile.avatar_url
  // }

  // checkImage () {
  //   this.imageUrl = this.$store.state.profile.avatar_url
  // }

  get backgroundImage() {
    return "url('" + this.$props.imageUrl + "')";
  }

  onImageChange(event: HTMLInputEvent) {
    const files = event.target.files || null;
    if (files === null) {
      return
    }

    if (!files.length) {
      return
    }

    this.isUploading = true
    this.$store.dispatch(ActionTypes.UPLOAD_AVATAR, { file: files[0] })
  }
}
</script>

<style>
.avatar-container:hover > img {
  opacity: 0.5;
}

.avatar-container i {
  color: black;
  font-size: x-large;
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.avatar-container:hover > i {
  display: block;
}

.avatar-container input[type="file"] {
  display: none;
  position: absolute;
  top: 0;
}

.avatar-container:hover > input[type="file"] {
  display: block;
  opacity: 0;
  text-align: center;
  width: 7rem;
  height: 7rem;
}

.icon-wrapper input[type="file"] {
  opacity: 0;
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
