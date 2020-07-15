# widgets

<!-- MarkdownTOC autolink="true" autoanchor="true" -->

- [widgets](#widgets)
  - [Prerequisites](#prerequisites)
    - [Node.js and npm](#nodejs-and-npm)
    - [Library](#library)
      - [Installing from the npm registry](#installing-from-the-npm-registry)
      - [Building the lib yourself](#building-the-lib-yourself)
  - [Get started](#get-started)
  - [Folder structure](#folder-structure)
  - [Contribute](#contribute)
  - [Troubleshoot](#troubleshoot)
  - [Credits](#credits)

<!-- /MarkdownTOC -->

<a id="prerequisites"></a>

## Prerequisites

### Node.js and npm
To run this project you will need a package manager such as `npm`.
To install it, follow the guide at [npmjs.com](https://www.npmjs.com/get-npm).

### Library
To be able to use the widget API you will need to download the `@tecnojest/widget-base` package or build the `lib` yourself. 

#### Installing from the npm registry
If you are a registered partner, you will be able to download the package from the official registry. You will need to configure your local npm engine to point to Tecnojest's registry, by doing the following:

    # authenticate in the private npm registry
    npm login --registry https://npm.invidea.it
    # set the registry to point to @tecnojest's scope
    npm config set @tecnojest:registry https://npm.invidea.it

if during the first `npm login` step you receive a `UNABLE_TO_VERIFY_LEAF_SIGNATURE` error, then run:

    npm config set strict-ssl false

and try again.

#### Building the lib yourself
Everyone is able to build the `lib` themselves. To do so, follow these steps:  
1. Clone the repository
2. `cd` into the repository
3. `npm install` to install the dependencies
4. To build, run:  
    4.1 OSX / Linux: `npm run build`  
    4.2 Windows: `npm run build-windows`

To link the `lib` in your widget template:  
  a) Modify the import in the widget template of your choice to point to the built lib instead of `@tecnojest/widget-base`  
  b) Run `npm link` in the `lib` folder and `npm link @tecnojest/widget-base` in the widget template folder

<a id="get-started"></a>

## Get started

This repository contains the documentation, lib and templates for creating widgets.
Additional templates or implementations of widgets can be created by following the [lib's README](./lib/README.md#index-file)

<a id="folder-structure"></a>
## Folder structure

In the repository you can find the following folders:
* [doc](./doc)  
Contains a thorough description and outlines the purpose of the whole project in markdown.
See [the first article on the concept](https://blog.energenious.eu/?p=74).

* [lib](./lib)  
  The core of this project. Contains the skeleton for rendering widgets written in different techologies. 

* [templates](./templates)  
  Basic, working implementations of widgets written in various technologies, ready to be developed further. It is recommended to start off with these templates.  
  To use a template, please refer to its corresponding README.

<a id="contribute"></a>

## Contribute

To contribute to particular parts of the repository, please refer to the corresponding READMEs.

<a id="troubleshoot"></a>

## Troubleshoot

Please submit an issue if you encounter any bug.

<a id="credits"></a>

## Credits

- author: energenious GbR
- year: 2020
- contact: [opensource@energenious.eu](mailto:opensource@energenious.eu)
