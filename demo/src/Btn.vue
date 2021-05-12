<template>
  <button class="btn" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border: none;
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: 0.0892857143em;
  text-transform: uppercase;
  vertical-align: middle;
  white-space: nowrap;
  background-color: #1867c0;
  cursor: pointer;
  padding: 0.7rem 2rem;
  color: white;
  transition: background 0.28s;
}

.btn:hover {
  background: #1e7be6;
}
</style>
