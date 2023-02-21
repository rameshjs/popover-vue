# PopperJS-Vue

> This is a Vue 3 component used to create a popover with customizable options such as placement, trigger on hover, arrow display, and control over its manual showing/hiding. It also has events for when the Popper is opened or hidden, and a slot for adding custom content to the Popper.

## Props

- `placement` Sets the preferred placement of the Popper. Default value is `bottom`.
- `hover` Sets whether the Popper is triggered on hover or not. Default value is `false`.
- `arrow` Sets whether to display an arrow on the Popper or not. Default value is `false`.
- `disabled` Disables the Popper, which will also hide it if it was already open. Default value is `false`.
- `show` Sets whether the Popper is shown or hidden manually, ignoring other events (click, hover) if set to `true/false`. Default value is `null`.

## Events

- `open:popper` Triggered when the Popper is opened.
- `close:popper` Triggered when the Popper is hidden.

## Slots

- `content` Used for adding custom content to the Popper.

## Slot Props

The `content` slot provides the following variables and functions:

- `close` A function to close the Popper.
- `isOpen` Returns the `open` state of the Popper.
