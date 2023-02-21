<template>
  <div>
    <Popper>
      <button>Button</button>
      <template #content>
        <div class="hello">hello</div>
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
</style>
