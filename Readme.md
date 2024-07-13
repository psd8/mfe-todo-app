# Sticky Todo List With Re-arranging Feature

## Architecture

### Backend
- JSON API
- Python API

### Frontend
- MicroFrontend using Module Federation
- Docker for containerizing each individual app, running all apps in a single go using Docker Compose

#### Components
- Contains individual components or small micro-frontend projects that run independently and are exposed for consumption by the host app

#### Host Apps (product-listing)
- A standalone SPA React app that consumes MFE components exposed via module federation (alternative option: NX workspace for monorepo benefits, but using module federation for this small project)

### Docker Compose
- For deployment and running individual MFE containers as well as the backend API

## How to Run the Project

### Frontend

#### Prerequisites
- Navigate to the `frontend`, `product-listing`, and `components` folders and run `npm install` or `yarn install` to install the required npm modules
- Install Docker Desktop, Docker, and Docker Compose
- Start Docker Desktop or Docker daemon

#### Running the Project

1. **Docker Compose**

   - **Development Environment**: 
     ```sh
     docker-compose up --build
     ```
     This command runs all the micro-frontend apps with the host app. Check `localhost:8082` and `localhost:8083`.

   - **Production Environment**:
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
     **Note**: Ensure that all the remote apps consumed by this host app are up and running. You can check the `webpack.config` module federation configuration to confirm which apps should be up and running.