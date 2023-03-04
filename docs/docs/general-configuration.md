# General configuration

General props configuration.

## `placement`

Sets the preferred placement of the Popover.

- Type: `String`
- Default: `bottom`

Example:

```vue
<template>
  <Popover placement="top">
    <button>Button</button>
    <template #content>
      <div>content</div>
    </template>
  </Popover>
</template>
```

## `hover`

Sets whether the Popover is triggered on hover or not.

- Type: `Boolean`
- Default: `false`

Example:

```vue
<template>
  <Popover hover>
    <button>Button</button>
    <template #content>
      <div>content</div>
    </template>
  </Popover>
</template>
```

## `arrow`

Sets whether to display an arrow on the Popover or not.

- Type: `Boolean`
- Default: `false`

Example:

```vue
<template>
  <Popover arrow>
    <button>Button</button>
    <template #content>
      <div>content</div>
    </template>
  </Popover>
</template>
```

## `disabled	`

Disables the Popover and hides it if it was already open.

- Type: `Boolean`
- Default: `false`

Example:

```vue
<template>
  <Popover disabled>
    <button>Button</button>
    <template #content>
      <div>content</div>
    </template>
  </Popover>
</template>
```

## `show	`

Sets whether the Popover is shown or hidden manually, ignoring other events (`click`, `hover`) if set to `true` or `false`.

- Type: `Boolean`
- Default: `false`

Example:

```vue
<template>
  <Popover :show="true">
    <button>Button</button>
    <template #content>
      <div>content</div>
    </template>
  </Popover>
</template>
```
