---
title: "Purpose"
---

## Composition

The developer will be able to embed technologically-independent applications into a hosting platform, also allowing event-based communication between them.

## Global state

Any component's global state can be accessed and modified using **Redux**'s `actions`, `dispatch` and `reducers`.

## Preserving state

The [Widget API](/widget-api) allows the developer to access any component's global state and preserve it in any particular way.

## Communication with the host

Through the use of native browser events or the [Widget API](/widget-api), the components can communicate with the hosting platform and react to e.g. theme changes.

## Communication between components of the same kind

The included event manager can be used to allow other components of the same kind to communicate between each other. See how it works in our [Live Examples section](./storybook)
