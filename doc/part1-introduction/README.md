<p align="left"">
    <img src="./media/modular.jpg" width="400" />
</p >


Software engineering is one of the most dynamic fields of technology, constantly undergoing rapid changes. One of the drivers of such a mutable ecosystem, is the wide adoption of open-source software as foundation of a large range of software projects. Even more so in web software engineering, where the pace of innovation is astonishingly high.

For the past decades, the web has undergone transitions under many aspects, with a clear trend towards distributed systems and open architectures.

Our philosophy at [**energenious**](https://energenious.eu) is to embrace decentralization and modularity at all layers of digitalization of the new energy future, both in system design and software engineering.

This series of articles will give you an insight in the design practices adopted - and [freely distributed](https://gitlab.com/energenious/widgets) - by energenious' development team, to create modular User Interfaces (UI) for web-based applications, named **"Widget-driven design"** (or **WDD** in short).

> WDD aims to increase productivity in the agile development of web-applications for small- to medium-sized teams, by promoting code re-usability, loose coupling, and technology agnostic programming of web UIs. 

## Content ##

<!-- MarkdownTOC autolink="true" autoanchor="true" -->

- [Context and motivation](#context-and-motivation)
- [Executive summary and Use Case](#executive-summary-and-use-case)
- [Conclusion](#conclusion)

<!-- /MarkdownTOC -->

<a id="context-and-motivation"></a>
## Context and motivation ##

Modern digital systems are powered by the one underlying resource: data. This "new oil" fuels an ever growing plurality of distributed services and algorithms which in turn constitute the Business Intelligence of modern digital enterprises.

In the context of energy, Big Data, IoT, and other data-driven architectures are devoted to improve private comfort, efficiency, system stability, and more broadly, to perform energy management. **Energy Information Systems** (EIS) are among the tools available to professionals to perform data analysis, monitor system performance, track energy performance indicators (EnPI) and so on. Among others, EIS make heavy use of **data visualization** as the core tool used to convey useful information to their users. More specifically, charts and tables are commonly arranged into so called **Dashboards**.

A quick web search for the most used frameworks for building dashboard-centric UIs prompts us to the broadly adopted [Grafana](https://grafana.com/), ranking [121<sup>st</sup>](https://gitstar-ranking.com/grafana) in the top open-source projects on Github (as of publication date of this post). Although excellent for monitoring resources in computer clusters and other visual systems, Although capable of performing data visualization and sending alerts, Grafana is too general-purpose for application in EIS and IoT systems, lacking more specific functionalities for performing energy analytics or replacing conventional SCADA systems.

A much more specialized tool for such use cases is [ThingsBoard](https://thingsboard.io/), an excellent open-source framework for building interactive and customizable dashboard-centric UIs for IoT systems. The framework is built on top of Java and Nodejs and allows for user-friendly customization of dashboards and plug-in of physical devices.

Such tools are great for rapid prototyping and developing Proofs-of-concept (POC), but quickly reach their limits, when high-levels of customization and integration with partner solutions are required. This makes them unsuitable for distribution in commercial products.

As a consequence, IoT and energy companies, with focus on digital, end-users systems, need to **invest resources** in the development of own analytics systems and dashboard-centric UIs, which often means:

* hiring a team of UI specialists, skilled in data visualization
* having to reinvent the wheel, by replicating established dashboard-centric environments on premises

Wouldn't be simpler if those companies only needed to take care of developing their own Business Intelligence, while creating powerful dashboard-centric UIs by simply stacking together off-the-shelf modules provided by external providers (partners or open-source)?

This is the problem WDD is trying to address: 

> The objective of WDD is to establish a development and distribution standard for creation of re-usable, framework-agnostic, software modules and their integration in web-UIs for data visualization and analytics

To show the viability and the importance of embracing a modular design approach in software development, we refer to the Basic Widget API from the ThingsBoard documentation itself; available [here](https://thingsboard.io/docs/user-guide/contribution/widgets-development/#basic-widget-api). ThingsBoard's team put together a valuable API for allowing developers to contribute to their open-source project. **energenious goes beyond providing a mere scheme or an API** for programmers to contribute to a pre-existing framework (as ThingsBoard does); by making use of WDD to create tools and promote a series of **common practices** for UI designers and data analysts to package and distribute their products in a way that can be easily **integrated in third-party software**.

<a id="executive-summary-and-use-case"></a>
## Executive summary and Use Case ##

This post is the first of a series of articles and tutorials that the energenious team will be publishing in the upcoming weeks, offering an introduction to core concepts behind WDD. The publications will cover different technical aspects of WDD, ranging from design and implementation, all the way to testing and deployment.

The tutorials in the series will address experienced front-end developers, software architecture engineers, and all of those who are interested in embracing new design practices for agile software development.

> The material covered in the tutorials will be made available under energenious' [open-source archive](https://gitlab.com/energenious/widgets), free for usage and contribution. The tutorials are complemented by JavaScript code examples, also available in the repository.

All through the series we will be demonstrating the practical implementation of new concepts of WDD in a real production context. **energenious has partnered up with [Tecnojest srl](https://www.invidea.it/)** an innovative player in the Italian IoT market, to showcase the implementation of WDD in the context of IoT and Big Data. 

Tecnojest is hosting its own Big Data platform, called Office-over-IP (O2IP). As part of this cooperation, a proprietary SDK for development and distribution of widgets has been designed, that is now used in production by Tecnojest under O2IP. Within the series we will be sharing insights on lesson-learned during real-life implementation of WDD in O2IP. This will include validating the benefits of adopting the new paradigm, but also critically analyzing potential challenges and open questions surrounding WDD. 

In the picture below, you get already a glimpse of the benefits WDD can offer. Different micro-applications, written by two distinct developer teams using different libraries (here native JQuery, ReactJS, and Angular), can co-exist and interact in the same environment, offering a wide range of services to the end-user.

<p align="center" >
    <img src="./media/O2IP_dashboard.png" width="80%" />
</p >


<a id="conclusion"></a>
## Conclusion ##

With this series, we want to increase awareness on WDD, promote participation and discussion within the open-source community, support our existing integration partners and attract new ones.

In the next post we will dive deeper in the nature of WDD, explaining what widgets are, what is their life cycle, and the ecosystem that they build. If you are interested in learning more about WDD, or how it can be implemented in your workflow, contact us through the [contact form](https://blog.energenious.eu/?page_id=151), or simply subscribe to this post for further updates.

Send us an email at [opensource@energenious.eu](mailto:opensource@energenious.eu) for technical questions, further integration support, training, etc.

