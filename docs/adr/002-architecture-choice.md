# Architecture choices
> In order to show my knowledge, I decided to follow the path described in this document. However, my go-to solution would not have been this one because of the time constraints I had to do this exercise. In the end, time is also a variable in the equation. I will describe in a future ADR what I would implement for this exercise to be more efficient to build, and to execute.

## Context
To improve the structure and maintainability of our software system, we propose adopting the following principles and patterns:

## Decision
We will follow the below principles, techniques, etc.:

- SOLID principles: to write better OOP code that is more maintainable and testable.
- Hexagonal Architecture: Separates core business logic from external concerns for a modular and flexible design.
- Dependency Inversion: Uses abstractions to decouple high-level modules from low-level details.
- Repository Pattern: Provides a standardized way to access and persist domain objects.
- Presentation Layer for REST: Separates presentation logic from the business domain for integration and automation.

## Consequences
The adoption of these decisions will result in:

- Improved modularity, flexibility, and maintainability.
- Clear separation between layers and cohesive components.
- Better understanding of the business domain.
- Reduced coupling and improved extensibility.
- Enhanced integration capabilities.
- Automation of periodic tasks.
- Encapsulated and expressive domain entities.

These changes will lay the foundation for a robust and scalable architecture.

That being said, I must say that the exercise is not the best example of this kind of architecture. Despite this, I feel the need to show my knowledge in this area. In a real case scenario I would have developed this taking a different approach.