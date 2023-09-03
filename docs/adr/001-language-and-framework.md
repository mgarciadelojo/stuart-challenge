# Programming Language & Framework

## Context
In this ADR, I am discussing the choice of programming language and its impact on the speed of solving the challenge, subsequent decisions, and the scalability of the solution. The original README.md of the repository mandates the use of Python, but the recruiter has granted the freedom to choose a language based on personal comfort and expertise.

## Decision
For this project, I propose using Typescript as the programming language. This decision is based on my current proficiency and familiarity with Typescript, which allows for clearer expression of ideas and more effective implementation. Additionally, I suggest utilizing Express, a web/API framework for Typescript, which complements the language and facilitates development.

## Consequences
The choice of Typescript and Express may present implications in terms of scalability. It's important to note that the original README.md specifies Python as a requirement in the "Tooling" section. Fever's preference for Python is purely logical since it seems the de-facto language there. On the other hand, Typescript's single-threaded nature may pose challenges when scaling the solution. However, it is worth mentioning that the chosen solution should still be capable of scaling to meet the performance requirements of handling 10k-15k requests per second, as stated in the exercise.
