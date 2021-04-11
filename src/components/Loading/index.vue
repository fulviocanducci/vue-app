<template>
  <div class="d-flex justify-content-center mt-2 mb-3" v-if="status">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-loading",
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
