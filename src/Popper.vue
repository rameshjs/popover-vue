<template>
  <div>
    <div class="popper-trigger" ref="popperTrigger">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "BasePopper",
};
</script>
<script setup>
import { onMounted, ref } from "vue";

const popperTrigger = ref(null);

const clickEvent = (e) => {
  console.log(e);
};

const mouseenter = (e) => {
  console.log(e);
};

const mouseleave = (e) => {
  console.log(e);
};

const focusEvent = (e) => {
  console.log(e);
};

const blurEvent = (e) => {
  console.log(e);
};

onMounted(() => {
  [
    ["click", clickEvent],
    ["mouseenter", mouseenter],
    ["mouseleave", mouseleave],
    ["focus", focusEvent],
    ["blur", blurEvent],
  ].forEach(([event, listener]) => {
    popperTrigger.value.addEventListener(event, listener);
  });
});
</script>
