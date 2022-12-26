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

## Architecture

This is a dummy application that applies scalable approaches to regular problems.

**Clean Architecture**
--todo--

**Domain Driven Design**
--todo--

**Event Driven Design**
--todo--

**Functional Programming**
--todo--

**Unit, Integration and E2E Testing**
--todo--

**GraphQL**
--todo--

**Build & Deploy**
--todo--
