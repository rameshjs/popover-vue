# Passing content

## using the content `slot`

we can use the `#content` slot to pass desired content to popover

```vue
<template>
  <Popover>
    <button>Button</button>
    <template #content>
      <div>content</div>
    </template>
  </Popover>
</template>
```

In the above code snippet, the Popover component contains a button and a template element with the `#content` slot. The content within this slot will be rendered inside the popover when it is displayed.

To pass custom content to the popover, simply replace the div element within the #content slot with your desired content.
