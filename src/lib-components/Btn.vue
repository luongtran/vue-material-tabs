<template>
  <button class="btn" @click="$emit('click')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
    >
      <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>
  </button>
</template>

<script>
export default {
  name: "Btn",
};
</script>

<style scoped>
.btn {
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
}

.btn svg {
  height: 24px;
  width: 24px;
}

.btn:disabled svg {
  fill: rgb(214, 213, 213);
  cursor: default;
}
</style>
