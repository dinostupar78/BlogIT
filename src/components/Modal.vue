<script>
import { Modal, Ripple, initMDB } from "mdb-ui-kit";
initMDB({ Modal, Ripple });

export default{
  props: ["modalMessage"],
  methods: {
    closeModal(){
      this.$emit("close-modal");
    },
  },

};

</script>

<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-mdb-ripple-init data-mdb-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{ {this.modalMessage}}</p>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" type="button" class="btn btn-primary" data-mdb-ripple-init>Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>