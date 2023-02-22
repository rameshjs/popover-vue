<template>
  <div class="hello1">
    <Popover>
      <button>Button</button>
      <template #content="{ close, isOpen }">
        <button @click="close">{{ isOpen }}</button>
      </template>
    </Popover>
  </div>
</template>
<script setup>
import Popover from "./Popover.vue";
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
