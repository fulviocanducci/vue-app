<template>
  <app-form-base :form-status="status"></app-form-base>
</template>
<script>
import appFormBase from "./components/base";
import { status } from "./../../utils";
export default {
  name: "app-form-update",
  components: { appFormBase },
  data() {
    return {
      status: status.update,
    };
  },
};
</script>
