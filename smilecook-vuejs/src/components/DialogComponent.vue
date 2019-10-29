<template>
  <div>
    <div
      v-show="dialog.show"
      class="modal fade show"
      tabindex="-1"
      role="dialog"
      style="display: block"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >{{dialog.title}}</h5>
            <button
              @click.stop="closeDialog()"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{dialog.msg}}
          </div>
          <div class="modal-footer">
            <button
              @click.stop="closeDialog()"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >No</button>
            <button
              @click.stop="dialog.callback()"
              type="button"
              class="btn btn-primary"
            >Yes</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="dialog.show"
      class="modal-backdrop fade show"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RecipeItem, AlertItem, DialogItem } from "@/response";
import { ActionTypes } from "@/store/aciton-types";

export interface ConfirmDialogItem {
  status: string;
  title: string;
  msg: string;
  hasConfirmButton: boolean;
  hasCancelButton: boolean;
  callback: any;
}

@Component
export default class DialogComponent extends Vue {
  // showComfirmDialog: boolean = false;
  // confirmDialogDisplay = "none";
  // confirmDialog: ConfirmDialogItem = {
  //   status: "",
  //   title: "",
  //   msg: "",
  //   hasConfirmButton: false,
  //   hasCancelButton: false,
  //   callback: () => {
  //     return;
  //   }
  // };

  // openConfirmDialog() {
  //   this.showComfirmDialog = true;
  //   this.confirmDialogDisplay = "block";
  // }

  // closeConfirmDialog() {
  //   this.showComfirmDialog = false;
  //   this.confirmDialogDisplay = "none";
  // }

  get dialog() {
    try {
      if (<boolean>this.$store.state.dialog.show) {
        return <DialogItem>this.$store.state.dialog;
      }
      throw Error;
    } catch (error) {
      return <DialogItem>{
        show: false,
        status: "",
        title: "",
        msg: "",
        hasConfirmButton: false,
        hasCancelButton: false,
        callback: () => {
          return;
        }
      };
    }
  }

  closeDialog() {
    this.$store.dispatch(ActionTypes.CLOSE_DIALOG);
  }

  beforeMount() {}
}
</script>

// <style lang="scss">
// .modal-backdrop {
//    background-color: #000000!important;
//    opacity: 0.5!important;
// }
//
</style>
