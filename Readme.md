# Gallery With Re-arranging Feature

## Running the Application

You can run the whole app with microservices and frontend using Docker Compose. [Here is live demo deployed using AWS EC2](http://54.91.174.235:8082)
[DNDComponent](http://54.91.174.235:8083)
[AutoSaveComponent](http://54.91.174.235:8084)
[MicroService](http://54.91.174.235:9999/data)

### Development Environment

```sh
docker-compose up -d
```

### Production Environment

```sh
docker-compose -f docker-compose.prod.yml up -d
```

### Running Starlette Microservices App

```sh
docker-compose -f docker-compose.services.yml up -d
```

## Endpoints to Check Apps

- **Microservices:** `http://localhost:9999/data` (GET|POST)
- **Product-Listing (host-app-container):** `http://localhost:8082`
- **Individual Containers for Components:**
  1. **DragNDrop:** `http://localhost:8083`
  2. **AutoSave:** `http://localhost:8084`

## Status of Key Points

1. **Part 1: Frontend** - Done

   - Setup and wrote test cases.
   - More TypeScript definitions can be added.

2. **Part 2: Making API Call** - Done

3. **Part 3: Trying it out!** - Done

4. **Part 4: Deployment** - Done

5. **Part 5: General Questions** - Added thought process at the end of this README.

## Architecture

### Backend

- **Starlette API with PostgreSQL and Python** (refer to `docker-compose.service.yml`)
  1. **GET Method:**
     - Endpoint: `http://localhost:9999/data`
     - Initial data seed will be done using `init.sql` file.
     - Returns data ordered by position.
     - pgAdmin service added on port 5000.
  2. **POST Method:**
     - Endpoint: same as GET API.
     - Takes the whole list as request parameters and updates in the database.

### Frontend

- **MicroFrontend using Module Federation**
- **Docker** for containerizing each individual app and running all apps using Docker Compose.

#### Components

- Contains individual components or small micro-frontend projects that run independently and are exposed for consumption by the host app.

#### Host Apps (product-listing)

- A standalone SPA React app that consumes MFE components exposed via Module Federation. Considered alternatives like NX workspace for monorepo benefits but opted for Module Federation due to the project's size.

### Docker Compose

- Used for deployment and running individual MFE containers as well as the backend API.

## How to Run the Project

### Frontend

#### Prerequisites

- Navigate to the `frontend`, `product-listing`, and `components` folders and run `npm install` or `yarn install` to install the required npm modules.
- Install Docker Desktop, Docker, and Docker Compose.
- Start Docker Desktop or the Docker daemon.

#### Running the Project

1. **Docker Compose**

   - **Development Environment:**

     ```sh
     docker-compose up --build
     ```

     This command runs all the micro-frontend apps with the host app. Access them via `localhost:8082` and `localhost:8083`.

   - **Production Environment:**

     ```sh
     docker-compose -f docker-compose.prod.yml up
     ```

2. **Via npm Scripts**

   - First, go to the `dragndrop-component` directory and run:

     ```sh
     yarn start
     ```

   - Then, go to the `product-listing` app directory and run:

     ```sh
     yarn start
     ```

     **Note:** Ensure all remote apps consumed by the host app are up and running. Check the `webpack.config` Module Federation configuration for details on which apps need to be running.

### Part 5: General Questions (Continue From Status of Key Points)

We can develop the API in the following way:

#### Endpoints and Methods

1. **Standard REST API Way**

   - **GET /elements** - Retrieves all elements.
   - **GET /elements/{id}** - Retrieves a specific element.
   - **POST /elements** - Creates a new element.
   - **PUT /elements/{id}** - Updates an existing element.
   - **DELETE /elements/{id}** - Removes an element.

2. **Integrate GraphQL API Server** with services as well as with frontend for more modular and efficient API calls.

   - Request only required attributes from the GraphQL schema.
   - Strong caching mechanism for improved API performance.

3. **Version Your API Endpoints** (`/v1/data`, `/v2/data`, etc.) to ensure backward compatibility.

4. **Design API with Filtering and Pagination Support**.

5. **Configure CI/CD Pipelines** to automate the deployment process.

## Thought Process While Developing this Solution

- Looking at problem statement I decided to go with MicroFrontend Architecture with module federation, actually i was confused with module federation and NX workspace monorepo micro-frontend framework with deployment support but at the end decided to go with module federation as project demands
  - individual deployment support
  - dynamic lazy loading of file which make bundle size smaller and make app rendering faster
  - reduce performance bottleneck
- **More Reasons for Selecting MicroFrontend Architecture:**
  - Easier to containerize and deploy individual components or apps.
  - Focus on inter-app communication and the best ways to achieve it.

### Key Decisions

1. **Frontend/Components Structure:**

   - Each component is an individual React app (or any other framework) placed inside the `components` folder.
   - All apps are inside `frontend/Application1`, `frontend/Application2`, etc., and exposed using Module Federation.

2. **Build and Deployment:**

   - Each app/component folder contains a Dockerfile for creating Docker images for development and production.
   - Individual apps can run with Docker or npm scripts.

3. **Technologies Used:**

   - **Create React App (CRA)**
   - **TypeScript** for type safety (only initial level of component props due to time constraints).
   - **React Hooks** and custom hooks for API integration.
   - **Modern React development principles** to ensure code modularity and adherence to SOLID/DRY principles.

4. **Backend Services:**
   - Basic CRUD API developed using Starlette with PostgreSQL.
   - Integrated frontend with custom `useFetch` hook.
   - Great learning experience with Python and Starlette!

### Future Improvements

As mostly focused on hight level things and configuration don't able to spend much time on following areas which i though i will work on it.

- Write test cases and setup coverage.
- SonarLint report and rules setup.
- Full support of TypeScript.
- Commit hooks setup.
