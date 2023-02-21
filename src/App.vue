<template>
  <div class="hello1">
    <Popper>
      <button>Button</button>
      <template #content="{ close, isOpen }">
        <button @click="close">{{ isOpen }}</button>
      </template>
    </Popper>
  </div>
</template>
<script setup>
import Popper from "./Popper.vue";
</script>
<style>
.hello {
  width: 200px;
  height: 400px;
  background: red;
}
.hello1 {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 200px;
}
</style>
