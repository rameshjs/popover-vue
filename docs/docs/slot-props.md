# Slots props

The content slot provides the following variables and functions:

| Name     | Type     | Description                              |
| -------- | -------- | ---------------------------------------- |
| `close`  | Function | A function to close the Popover.         |
| `isOpen` | Boolean  | Returns the `open` state of the Popover. |

You can obtain access to the `close` function for uncommon situations. In this particular instance, we use the `close` function to dismiss the Popover when a button is clicked within it.

```vue
<template>
  <Popover>
    <Button>Demo</Button>
    <template #content="{ close, isOpen }">
      <Button @click="close">Close</Button>
    </template>
  </Popover>
</template>
```
