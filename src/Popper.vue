<template>
  <div>
    <div class="popper-trigger" ref="popperTrigger">
      <slot></slot>
    </div>
    <div ref="popperContent" class="popper-content">
      sadasdasdasdasdasdasdasdasdasdasdasdasdas
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
import { computePosition, offset, flip, shift, arrow } from "@floating-ui/dom";
import { onMounted, ref } from "vue";

const popperTrigger = ref(null);
const popperContent = ref(null);
const popperArrow = ref(null);

const contentPosition = (target) => {
  const content = popperContent.value;
  const arrowElement = popperArrow.value;

  computePosition(target, content, {
    placement: "top",
    middleware: [
      offset(6),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowElement }),
    ],
  }).then(({ x, y, placement, middlewareData }) => {
    Object.assign(content.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    const { x: arrowX, y: arrowY } = middlewareData.arrow;

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]];

    Object.assign(arrowElement.style, {
      left: arrowX != null ? `${arrowX}px` : "",
      top: arrowY != null ? `${arrowY}px` : "",
      right: "",
      bottom: "",
      [staticSide]: "-4px",
    });
  });
};

const clickEvent = (e) => {
  contentPosition(e.target);
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
