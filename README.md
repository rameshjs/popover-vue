# Popover-vue


>This is a Vue 3 component used to create a popover with customizable options such as placement, trigger on hover, arrow display, and control over its manual showing/hiding. It also has events for when the Popper is opened or hidden, and a slot for adding custom content to the Popper.

---

## Props

| Name               | Type     | Default | Description                                                                                               |
| ------------------ | -------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `placement`        | String   | `bottom` | Sets the preferred placement of the Popper.                                                               |
| `hover`            | Boolean  | `false` | Sets whether the Popper is triggered on hover or not.                                                     |
| `arrow`            | Boolean  | `false` | Sets whether to display an arrow on the Popper or not.                                                     |
| `disabled`         | Boolean  | `false` | Disables the Popper and hides it if it was already open.                                                   |
| `show`             | Boolean  | `null`  | Sets whether the Popper is shown or hidden manually, ignoring other events (click, hover) if set to `true` or `false`. |

---

## Events

| Name           | Description               |
| -------------- | ------------------------- |
| `open:popper`  | Triggered when the Popper is opened. |
| `close:popper` | Triggered when the Popper is hidden. |

---

## Slots

| Name      | Description            |
| --------- | ---------------------- |
| `content` | Used for adding custom content to the Popper. |

---

## Slot Props

The `content` slot provides the following variables and functions:

| Name     | Type     | Description                            |
| -------- | -------- | -------------------------------------- |
| `close`  | Function | A function to close the Popper.        |
| `isOpen` | Boolean  | Returns the `open` state of the Popper. |
