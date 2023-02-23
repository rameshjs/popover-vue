<template>
  <div ref="popoverWrapper" class="popover-wrapper">
    <div class="popover-trigger" ref="popoverTrigger">
      <slot></slot>
    </div>
    <div
      v-show="showPopoverContent && !disabled"
      ref="popoverContent"
      class="popover-content"
    >
      <slot
        name="content"
        :close="closePopover"
        :isOpen="showPopoverContent"
      ></slot>
      <div v-show="arrow" ref="popoverArrow" class="arrow"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BasePopover",
};
</script>
<script setup>
import { onMounted, ref, watch, computed, onUnmounted } from "vue";
import { contentPosition } from "./utils/popover";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["open:popover", "close:popover"]);

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
  placement: {
    type: String,
    default: "bottom",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  show: {
    type: Boolean,
    default: null,
  },
});

const popoverTrigger = ref(null);
const popoverContent = ref(null);
const popoverArrow = ref(null);
const popoverWrapper = ref(null);

const showPopoverContent = ref(false);

const computedShow = computed(() => props.show);

watch(showPopoverContent, (updatedValue) => {
  if (updatedValue) {
    emit("open:popover");
  } else {
    emit("close:popover");
  }
});

watch(computedShow, (updatedValue) => {
  contentPosition(
    popoverTrigger.value,
    popoverContent.value,
    popoverArrow.value,
    props.placement
  );
  showPopoverContent.value = updatedValue;
});

const toggle = (e) => {
  contentPosition(
    e.target,
    popoverContent.value,
    popoverArrow.value,
    props.placement
  );
  showPopoverContent.value = !showPopoverContent.value;
};

const openPopover = (e) => {
  contentPosition(
    e.target,
    popoverContent.value,
    popoverArrow.value,
    props.placement
  );
  showPopoverContent.value = true;
};

const closePopover = () => {
  if (props.show === null) {
    showPopoverContent.value = false;
  }
};

const mouseenter = (e) => {
  if (props.hover) {
    openPopover(e);
  }
};

const mouseleave = () => {
  if (props.hover) {
    closePopover();
  }
};

onClickOutside(popoverWrapper, () => {
  if (props.clickOutside) {
    closePopover();
  }
});

onMounted(() => {
  [
    ["click", toggle],
    ["mouseenter", mouseenter],
    ["mouseleave", mouseleave],
    ["focus", openPopover],
    ["blur", closePopover],
  ].forEach(([event, listener]) => {
    popoverTrigger.value.addEventListener(event, listener);
  });
});

onUnmounted(() => {
  [
    ["click", toggle],
    ["mouseenter", mouseenter],
    ["mouseleave", mouseleave],
    ["focus", openPopover],
    ["blur", closePopover],
  ].forEach(([event, listener]) => {
    popoverTrigger.value.removeEventListener(event, listener);
  });
});
</script>
<style scoped>
.popover-wrapper {
  display: inline-block;
}

.arrow {
  position: absolute;
  background: var(--popover-content-background);
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  z-index: -1;
}

.popover-content {
  position: absolute;
  background: var(--popover-content-background);
  padding: var(--popover-content-padding);
  border-radius: var(--popover-content-border-radius);
  z-index: var(--popover-content-z-index, 999);
  box-shadow: var(--popover-content-box-shadow);
}
</style>
