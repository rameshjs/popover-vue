# Popover-vue

> This is a Vue 3 component used to create a popover with customizable options such as placement, trigger on hover, arrow display, and control over its manual showing/hiding. It also has events for when the Popover is opened or hidden, and a slot for adding custom content to the Popover.

[![License](https://img.shields.io/npm/l/popover-vue)](https://github.com/rameshjs/popover-vue/blob/main/LICENCE)
[![npm](https://img.shields.io/npm/v/popover-vue)](https://www.npmjs.com/package/popover-vue)
![Downloads](https://img.shields.io/npm/dt/popover-vue)

## [DOCUMENTATION](https://rameshjs.github.io/popover-vue/)

#### [DEMO](https://stackblitz.com/edit/popover-vue?file=src%2FApp.vue)

## Installation

First step is to install it using `yarn` or `npm`:

```bash
yarn add popover-vue
```

or

```bash
npm i popover-vue
```

## Usage

```vue
<template>
  <Popover>
    <button>Button</button>
    <template #content>
      <div>content</div>
    </template>
  </Popover>
</template>

<script>
import Popover from "popover-vue";
import "popover-vue/dist/style.css";

export default {
  components: { Popover },
};
</script>
```

---

## Props

| Name        | Type    | Default  | Description                                                                                                             |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `placement` | String  | `bottom` | Sets the preferred placement of the Popover.                                                                            |
| `hover`     | Boolean | `false`  | Sets whether the Popover is triggered on hover or not.                                                                  |
| `arrow`     | Boolean | `false`  | Sets whether to display an arrow on the Popover or not.                                                                 |
| `disabled`  | Boolean | `false`  | Disables the Popover and hides it if it was already open.                                                               |
| `show`      | Boolean | `null`   | Sets whether the Popover is shown or hidden manually, ignoring other events (click, hover) if set to `true` or `false`. |

---

## Events

| Name            | Description                           |
| --------------- | ------------------------------------- |
| `open:popover`  | Triggered when the Popover is opened. |
| `close:popover` | Triggered when the Popover is hidden. |

---

## Slots

| Name      | Description                                    |
| --------- | ---------------------------------------------- |
| `content` | Used for adding custom content to the Popover. |

---

## Slot Props

The `content` slot provides the following variables and functions:

| Name     | Type     | Description                              |
| -------- | -------- | ---------------------------------------- |
| `close`  | Function | A function to close the Popover.         |
| `isOpen` | Boolean  | Returns the `open` state of the Popover. |
