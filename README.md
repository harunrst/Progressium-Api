# Progressium API

[![](https://github.com/harunrst/Progressium-Api/actions/workflows/build.yml/badge.svg)](https://github.com/harunrst/Progressium-Api/actions/workflows/build.yml) [![](https://github.com/harunrst/Progressium-Api/actions/workflows/lint.yml/badge.svg)](https://github.com/harunrst/Progressium-Api/actions/workflows/lint.yml) [![](https://github.com/harunrst/Progressium-Api/actions/workflows/test.yml/badge.svg)](https://github.com/harunrst/Progressium-Api/actions/workflows/test.yml) [![](https://github.com/harunrst/Progressium-Api/actions/workflows/deploy.yml/badge.svg)](https://github.com/harunrst/Progressium-Api/actions/workflows/deploy.yml)

Graphql API Url: https://progressium-api-g44qf6ssma-uc.a.run.app/api

Checkout the latest [release](https://github.com/harunrst/Progressium-Api/releases/latest)

## About

Progressium API is a tool to control simple startup phases. API doesn't include support for editing default phases. Phases are linked to each other, so that some rules are applied.

**Rules**

- You can add tasks to any phase in any state.
- Only tasks those are in an unlocked phase can be checked as completed.
- When all tasks are checked as completed, next phase is unlocked.
- When a task from previous phases checked as uncompleted, next phases get locked.
- When a task from previous phase checked as completed when there are next phases completed, next phases get unclocked until the next uncompleted phase. There is a traverse in the code.

**Features**

- List phases
- Add tasks for each phases
- Do/Undo tasks

You can import api collection -> [api-collection.json](https://github.com/harunrst/Progressium-Api/blob/release/api-collection.json)

## Architectural Approaches

This is a dummy application that applies scalable approaches to regular problems.

**Clean Architecture**

The point with this approach is to keep the dependency flow as their importance and dynamism. If you carefully read the code, you will realize that;

- Domain never references other components. It is as clean as unit, easily testable.
- Domain rules stays in domain. Domain is the most crucial part of the application, anything can change and might need to be scaled but domain should be protected from those changes not to harm the business. This is why domain is designed to be smart classes, it doesn't include simple interfaces.
- Around the domain, there is application where we handle business operations. This part is pretty changable, new architectures and approches will always be there. Different domain needs will occur in time, this part will adapt any changes and needs.
- Around the application, there is persistence where we implement persistent needs. Since it is a small demo application, I put infrastructural needs also in persistence.
- Around the application, there is also infrastructure where we implement external libraries such as cache, logging, event bus etc. It is very important to abstract those in application component to prevent any future problem when they needed to be replaced with other libraries.

Simply; it is to control dependency flow, to keep components independent, to make components easily scalable and testable.

See [here](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) as well for more information.

**Domain Driven Design**

Shortly, make domain smart and ubiquiotus language! Domain should be talking to you. Yes, code can speak the same language as you do. It requires a different way of thinking to implement scalable DDD, so this is a **danger zone**!

See [here](https://martinfowler.com/bliki/DomainDrivenDesign.html) as well for more information.

**Event Driven Design**

It is very common among decoupled services and it also perfectly fits to DDD. The business needs of my demo required me to use an in memory event design.

See [here](https://aws.amazon.com/event-driven-architecture/) as well for more information.

**Functional Programming**

Clean, easily testable and stateless. No more words needed :)

**Unit, Integration and E2E Testing**

**GraphQL**

**Workflows & Deployment**

_Build:_ It builds with [webpack](https://webpack.js.org/) to bundle my code.

_Linter:_ It lints with [eslint](https://eslint.org/) to make sure a clean code.

_Tests:_ It tests with [jest](https://jestjs.io/).

_Deploy:_ It deploy with docker. It creates an image and push to google container registry. Then triggers google cloud run to deploy the container.
