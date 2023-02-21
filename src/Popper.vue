<template>
  <div ref="popperWrapper" class="popper-wrapper">
    <div class="popper-trigger" ref="popperTrigger">
      <slot></slot>
    </div>
    <div v-show="showPopperContent" ref="popperContent" class="popper-content">
      <slot name="content"></slot>
      <div v-show="arrow" ref="popperArrow" class="arrow"></div>
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
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  hover: {
    type: Boolean,
    default: false,
  },
  clickOutside: {
    type: Boolean,
    default: true,
  },
  arrow: {
    type: Boolean,
    default: true,
  },
});

const popperTrigger = ref(null);
const popperContent = ref(null);
const popperArrow = ref(null);
const popperWrapper = ref(null);

const showPopperContent = ref(false);

const toggle = (e) => {
  contentPosition(e.target, popperContent.value, popperArrow.value);
  showPopperContent.value = !showPopperContent.value;
};

const openPopper = (e) => {
  contentPosition(e.target, popperContent.value, popperArrow.value);
  showPopperContent.value = true;
};

const closePopper = () => {
  showPopperContent.value = false;
};

const mouseenter = (e) => {
  if (props.hover) {
    openPopper(e);
  }
};

const mouseleave = () => {
  if (props.hover) {
    closePopper();
  }
};

onClickOutside(popperWrapper, () => {
  if (props.clickOutside) {
    closePopper();
  }
});

onMounted(() => {
  [
    ["click", toggle],
    ["mouseenter", mouseenter],
    ["mouseleave", mouseleave],
    ["focus", openPopper],
    ["blur", closePopper],
  ].forEach(([event, listener]) => {
    popperTrigger.value.addEventListener(event, listener);
  });
});
</script>
