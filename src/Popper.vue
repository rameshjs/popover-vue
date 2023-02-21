<template>
  <div>
    <div class="popper-trigger" ref="popperTrigger">
      <slot></slot>
    </div>
    <div v-show="showPopperContent" ref="popperContent" class="popper-content">
      <slot name="content"></slot>
      <div ref="popperArrow" class="arrow"></div>
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
import { contentPosition } from "./utils/popper";

const popperTrigger = ref(null);
const popperContent = ref(null);
const popperArrow = ref(null);

const showPopperContent = ref(false);

const toggle = () => {
  showPopperContent.value = !showPopperContent.value;
};

const openPopper = (e) => {
  contentPosition(e.target, popperContent.value, popperArrow.value);
  showPopperContent.value = true;
};

const closePopper = (e) => {
  contentPosition(e.target, popperContent.value, popperArrow.value);
  showPopperContent.value = false;
};

onMounted(() => {
  [
    ["click", toggle],
    ["mouseenter", openPopper],
    ["mouseleave", closePopper],
    ["focus", openPopper],
    ["blur", closePopper],
  ].forEach(([event, listener]) => {
    popperTrigger.value.addEventListener(event, listener);
  });
});
</script>
