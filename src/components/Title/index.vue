<template>
  <div>
    <h2>{{ text }}</h2>
    <hr />
  </div>
</template>

<script>
export default {
  name: "app-title",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
