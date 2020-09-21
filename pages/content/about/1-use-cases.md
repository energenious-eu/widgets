---
title: "Use cases"
metaTitle: "Widgets - Use cases"
---

## Micro-frontends approach

This library allows developers to separate a monolith app into smaller components, which in turn:

- keeps the codebases DRY and simple
- reduces the amount of complexity of the global state in the application
- allows teams to work on features independently

## Developing independent widgets integrated into a hosting platform

Suppose that your team is presented with a task to create a platform containing many widgets which would fetch and display data in many different ways. One way to approach this problem is to build a monolith application with a lot of shared state and dependencies both internal and external. While this may seem simple at first, the application is bound to become more and more difficult to maintain with time.

### Perhaps another way would be to keep each widget independent from the others?

Yes! And this library will help you do exactly that. Moreover, you are not bound to any particular technology. Currently the developers in your team can use:

- React
- React with TypeScript
- jQuery
- TypeScript
- Vaniila JavaScript

so feel free to work with whatever suits your particular widget the best and easily switch to another technology with the next widget.
