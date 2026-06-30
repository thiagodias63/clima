# Clima 🌤️

**Clima** (Portuguese for _Weather_) is a modern web application built to showcase the latest features of Angular alongside advanced testing and development workflows. The application displays the current temperature in Celsius for a curated list of cities.

Rather than relying on a live production API, the project serves as a comprehensive boilerplate and proof-of-concept (PoC) for robust frontend architecture, local data mocking, and high-coverage mutation testing.

---

## 🚀 Key Features

- **Mutation tests:** Executes with stryker an mutation test with 100% kill in report.
- **Real-time Feel:** Displays current weather data (in Celsius) for multiple cities.
- **Zero-Dependency Backend:** Fully operational offline thanks to local HTTP interceptor mocking.
- **Modern Angular Syntax:** Leveraging the cutting-edge capabilities of Angular 21.

---

## 🛠️ Tech Stack & Concepts Demonstrated

The primary goal of this repository is to demonstrate the integration and practical use of the following technologies:

### 1. Angular 21 (Modern Syntax)

- Written using the latest Angular features, prioritizing **Signals** for reactive state management.
- Utilizes the modern **Control Flow** syntax (`@if`, `@for`, `@switch`) for cleaner, more performant templates without `*ngIf` or `*ngFor`.
- Employs **Standalone Components** for a modular and lightweight architecture.

### 2. HTTP Interceptors for Mocking

- Features an intelligent `HttpInterceptor` that intercepts outgoing API requests to simulate backend responses.
- Allows seamless frontend development and testing without hitting rate limits or requiring API keys.

### 3. Faker.js

- Integrated within the interceptor layer to dynamically generate realistic, randomized weather metrics and city data on the fly.

### 4. Vitest

- Used as the primary test runner instead of traditional alternatives.
- Provides lightning-fast, multi-threaded unit test execution, significantly speeding up the local development loop.

### 5. Stryker (Mutation Testing)

- Integrated with **Stryker Mutator** to measure the true effectiveness of the test suite.
- By inserting bugs (mutants) into the code, it ensures that the unit tests are actually robust enough to catch regressions, taking code quality beyond basic line coverage metrics.

---

## 🏃‍♂️ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (latest LTS recommended).

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/your-username/clima.git](https://github.com/your-username/clima.git)
cd clima
```

2. Install the dependencies:

```bash
npm install
```

### Development Server

Run the application locally:

```bash
npm run start
```

Navigate to `http://localhost:4200/`.

---

## 🧪 Testing

### Running Unit Tests (Vitest)

To execute the high-performance unit test suite via Vitest:

```bash
npm run test
```

### Running Mutation Tests (Stryker)

To run Stryker and evaluate the effectiveness of your test suite against mutants:

```bash
npm run test:mutation
```

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
