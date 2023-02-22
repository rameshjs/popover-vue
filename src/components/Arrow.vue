<template>
  <div ref="popoverArrow" id="arrow" data-popover-arrow></div>
</template>
<script>
export default {
  name: "BaseArrow",
};
</script>
<script setup>
import { ref, defineExpose } from "vue";

const popoverArrow = ref(null);

defineExpose({ popoverArrow });
</script>
<style scoped>
#arrow,
#arrow::before {
  transition: background 250ms ease-in-out;
  position: absolute;
  width: calc(10px - var(--popover-theme-border-width, 0px));
  height: calc(10px - var(--popover-theme-border-width, 0px));
  box-sizing: border-box;
  background: var(--popover-theme-background-color);
}

#arrow {
  visibility: hidden;
}

#arrow::before {
  visibility: visible;
  content: "";
  transform: rotate(45deg);
}

/* Top arrow */
.popover[data-popover-placement^="top"] > #arrow {
  bottom: -5px;
}

.popover[data-popover-placement^="top"] > #arrow::before {
  border-right: var(--popover-theme-border-width)
    var(--popover-theme-border-style) var(--popover-theme-border-color);
  border-bottom: var(--popover-theme-border-width)
    var(--popover-theme-border-style) var(--popover-theme-border-color);
}

/* Bottom arrow */
.popover[data-popover-placement^="bottom"] > #arrow {
  top: -5px;
}

.popover[data-popover-placement^="bottom"] > #arrow::before {
  border-left: var(--popover-theme-border-width)
    var(--popover-theme-border-style) var(--popover-theme-border-color);
  border-top: var(--popover-theme-border-width)
    var(--popover-theme-border-style) var(--popover-theme-border-color);
}

/* Left arrow */
.popover[data-popover-placement^="left"] > #arrow {
  right: -5px;
}

.popover[data-popover-placement^="left"] > #arrow::before {
  border-right: var(--popover-theme-border-width)
    var(--popover-theme-border-style) var(--popover-theme-border-color);
  border-top: var(--popover-theme-border-width)
    var(--popover-theme-border-style) var(--popover-theme-border-color);
}

/* Right arrow */
.popover[data-popover-placement^="right"] > #arrow {
  left: -5px;
}
</style>
