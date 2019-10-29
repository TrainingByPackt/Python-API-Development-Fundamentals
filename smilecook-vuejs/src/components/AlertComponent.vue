<template>
  <div
    class="row fade pb-2"
    :class="{ show: alert.show }"
  >
    <div class="col-12">
      <div
        class="alert"
        :class="alert.style"
        role="alert"
        style="height: 50px;"
      >
        {{alert.message}}
        <button
          @click.once="closeAlert()"
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AlertItem } from "@/response";
import { ActionTypes } from '@/store/aciton-types';

@Component
export default class AlertComponent extends Vue {
  get alert(): AlertItem {
    if ((<any>this.$store.state).alert.show === true) {
      setTimeout(() => {
        this.closeAlert();
      }, 5000);
    }
    return (<any>this.$store.state).alert;
  }

  closeAlert() {
    this.$store.dispatch(ActionTypes.CLOSE_ALERT);
  }

  beforeMount() {}
}
</script>