<p align="center"">
    <img src="https://assets.gitlab-static.net/uploads/-/system/project/avatar/17941820/logo_widgets.png" width="100" />
</p >

<style>
  blockquote {
    font-weight: 600
  }
  blockquote:hover {
    color:inherit;
  }
</style>
 
Software engineering is one of the most dynamic fields of techniques, constantly undergoing changes. 
One of the driver of such a mutable ecosystem, is the wide adoption of open-source software artifacts as fundament of most of software projects out there. This is even more so in the branch of web software engineering, where the pace at which innovations happens is astonishing high.

For the past decades, the web is undergoing transitions under so many aspect, but a clear pattern can be seen here too: the trend towards distributed systems and open architectures.

Our philosophy at [**energenious**](https://eo.energy) is to embrace decentralization and modularity at all layer of digitalization of the new energy future, from system to web-design.

This series of articles will illustrate the design practice adopted - and [freely distributed](https://gitlab.com/energenious/widgets) - by energenious' team to create modular UIs for web-based applications, named **"Widget-driven design"** (or **WDD** in short).

> WDD aims to increase productivity in the agile development of web-applications for small- to medium-sized teams, by promoting code re-usability, loose coupling, and technology agnostic programming of web UI. 

## Content ##

<!-- MarkdownTOC autolink="true" autoanchor="true" -->

- [Context and motivation](#context-and-motivation)
- [Project's scope](#TODO)
- [Concept of WDD](#TODO)

<!-- /MarkdownTOC -->

<a id="context-and-motivation"></a>
## Context and motivation ##

The modern world of digital systems is characterized by an underlying resource: data. This "new oil" fuels an ever growing plurality of distributed services and algorithms which in turns constitute the Business Intelligence of modern digital enterprises.

In the context of energy, big data, IoT, and other data-driven architectures are devoted to improve private comfort, efficiency, system stability, and in general to perform energy management. **Energy Information Systems** (EIS) are among the tools available to professionals to perform data analysis, monitoring system performance, tracking energy performance indicators (EnPI) and so on. Among others, the core tool used to convey useful information to their users, EIS make heavy use of **data visualization** and, above all, graphs and tables are arranged into **Dashboards**.

A quick web search for the most used frameworks for building dashboards-centric UIs prompts us to the broadly adopted [Grafana](https://grafana.com/), ranking [121<sup>st</sup>](https://gitstar-ranking.com/grafana) in the top open-source projects on Github (as of publication date of this post). Although excellent for monitoring resources in computer clusters, or other simple visual systems, Grafana is too general-purpose for application in EIS and IoT systems.

A much more specialized tool for such use cases is [ThingsBoard](https://thingsboard.io/), an excellent open-source framework for building interactive and customizable dashboard-centric UIs for IoT systems. The framework is built on top of Java and Nodejs and allows for user-friendly customization of dashboards and plug-in of devices.

Tools such the ones presented above are great for rapid prototyping and developing POCs, but quickly reach their limits, when high-levels of customization and integration with partner solutions are required, thus making them unsuitable for distribution in commercial products.

As a result of this digital IoT and energy companies need to invest resources in the development of own analytics systems and dashboard-centric UIs, which often means:

* hiring a team of UI specialists, skilled in data visualization
* having to reinvent the wheel for creating established dashboard-centric environments

Wouldn't be simpler if those companies would only need to take care of developing their own business intelligence, while developing powerful dashboard-centric UIs by simpling stacking together off-the-shelf modules provided by an external community (partners or open-source)?

This is the problem the WDD is trying to address: 

> The objective of WDD is to establish a development and distribution standard for creation of re-usable, framework-agnostic, software modules and their integration in UIs for data analytics

To show the viability and the importance of such a system we want to report the Basic Widget API from the Thingsboard documentation itself available [here](https://thingsboard.io/docs/user-guide/contribution/widgets-development/#basic-widget-api). Thingsboard's team put together a valuable API for allowing developers to contribute to their open-source project. What energenious aims to through WDD is to go beyond providing a scheme to contribute to a pre-existing framework, but rather creating tools and promoting a series of common practices for UI designers and data analysts to package and distribute their artifacts in a way that can be easily integrated in third-party software.

<a id="TODO"></a>
## Project's scope [TODO] ##

The upcoming series of tutorials addresses experienced front-end developers, software architecture engineers, and all of those who are interested in embracing new design practices for agile software development.

The material covered in the tutorials will be made available under energenious' [open-source archive](https://gitlab.com/energenious/widgets) and free for usage and contribution. The tutorials are complemented by JavaScript code examples, also available in the repository.

To validate feasibility and added value of WDD, energenious has partnered up with [Tecnojest srl](https://www.invidea.it/) an italian innovative IoT company, hosting its own BigData platform, called Office over IP (O2IP). The theoretical material from the tutorial has been further developed into proprietary SDKs, which are now used in production by Tecnojest. All along the tutorials we will offer you practical examples and discuss potential integration problems using the O2IP platform as real use case. The picture below offers a preview of how widgets, written using different libraries, can be prototyped and operated within the same platform:

<p align="center" >
    <img src="https://gitlab.com/energenious/widgets/-/raw/master/part1-introduction/media/O2IP_dashboard.JPG" width="80%" />
</p >

Please contact [opensource@energenious.eu](mailto:opensource@energenious.eu) for more specific questions, or support for integration, training, etc.

<a id="TODO"></a>
## Concept of WDD [TODO] ##

ingredients:

1. SDK
2. API
3. Test suite
4. Distribution server

<p align="center" >
    <img src="https://gitlab.com/energenious/widgets/-/raw/master/part1-introduction/media/widgets_ecosystem.JPG" width="70%" />
</p >

