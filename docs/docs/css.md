# CSS

To customize the appearance of the popover, you can use the following CSS variables.

```css
--popover-content-background
--popover-content-padding
--popover-content-border-radius
--popover-content-z-index
--popover-content-box-shadow
```

You have the ability to overwrite them in any way you prefer, such as within a Vue component:

```vue
<template>
  <Popover>
    <button>Button</button>
    <template #content>
      <div>content</div>
    </template>
  </Popover>
</template>
<style>
:root {
  --popover-content-background: #333333;
  --popover-content-box-shadow: 0 8px 40px 7px rgba(0, 0, 0, 1);
}
</style>
```
