# Installation

## Installation

First step is to install it using `yarn` or `npm`:

```bash
yarn add popover-vue
```

or

```bash
npm i popover-vue
```

## Global

To import and register the component globally in your Vue application, use the following code:

```js
import { createApp } from "vue";
import App from "./App.vue";
import Popover from "popover-vue";

const app = createApp(App);
app.component("Popover", Popover);
```

## Local

To import and register the component locally in a Vue component, use the following code:

```vue
<script>
import Popover from "popover-vue";

export default {
  components: { Popover },
};
</script>
```
