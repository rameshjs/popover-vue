import Popover from "./Popover.vue";

export const Plugin = {
  install(Vue) {
    Vue.component("Popover", Popover);
  },
};

export default Popover;
