# EDF Test Project

## Introduction

This project is built using Angular and aims to provide a clean, fast, and maintainable solution. Unlike many Angular projects that rely on Angular Material, we have chosen to use simple, custom components.

## Why We Chose Not to Use Angular Material

1. **Flexibility and Customization**  
   Angular Material offers a set of predefined components, but they often come with rigid styling and behavior. With custom components, we have full control over the look and feel of the UI, which allows us to create a unique design tailored to the needs of our users, without being constrained by Material’s conventions.

2. **Simpler Dependencies**  
   By not using Angular Material, we reduce the number of dependencies in our project, which leads to fewer updates, less complexity, and better maintainability. This also avoids potential conflicts or issues that might arise from using large third-party libraries.

4. **Lightweight Approach**  
   Custom components allow us to include only the styles and functionalities we need, which keeps the project lightweight. We can design a minimal set of components that are simple yet effective, ensuring that our application remains fast and easy to use.

## Custom Components Design

- Each component is designed with simplicity and modularity in mind.
- We use **SCSS** for styling, ensuring our components are lightweight and easy to maintain.
- Components are reusable, and we leverage Angular’s powerful directives and services to handle logic and state management.
- We follow a consistent design language that can be easily extended as the project grows.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
