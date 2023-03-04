# Events

| Name            | Description                           |
| --------------- | ------------------------------------- |
| `open:popover`  | Triggered when the Popover is opened. |
| `close:popover` | Triggered when the Popover is hidden. |

On occasion, it may be necessary to include some additional behaviors when opening or closing Popover. The provided events can be utilized for this purpose:

```vue
<template>
  <Popover @open:popper="" @close:popper="">
    <Button>Demo</Button>
    <template #content>
      <div>Content</div>
    </template>
  </Popover>
</template>
```
