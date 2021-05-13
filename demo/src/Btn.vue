<template>
  <button class="btn" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border: none;
  align-items: center;
  border-radius: 7px;
  display: inline-flex;
  flex: 0 0 auto;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;
  background-color: #1867c0;
  cursor: pointer;
  padding: 0.8rem 2rem;
  color: white;
  transition: background 0.28s;
}

.btn:hover {
  background: #1e7be6;
}
</style>
