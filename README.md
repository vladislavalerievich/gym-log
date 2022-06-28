# Gym Log

Full Stack Django & React Web App with JWT authentication.

### Main tools and libraries

Backend:

- `Django` as a web framework.
- `Django REST framework` for building web APIs, serialization, and deserialization.
- `JWT authentication` for securely transmitting information between frontend and backend applications.
- `PostgreSQL` as a database in production.

Frontend:

- `React` for building user interface.
- `React Bootstrap` for simplifying the creation and styling of React components.
- `React Query` for managing server state, getting data from the backend, and updating it.
- `Redux` for managing application state. And `Redux Persist` to store state between page reloads.
- `Formik` and `Yup` for object schema validation for login and register pages.

### Run application locally

You can run backend and frontend apps separately from their respective directories or use ```Docker Compose```.

````bash
docker-compose up --build
````

To access the fronted part of application open [http://localhost:3000](http://localhost:3000) in your browser.

To view `Swagger API endpoints` in your browser open [http://localhost:8000/swagger/](http://localhost:8000/swagger/).

To view `Django admin site` in your browser open [http://localhost:8000/admin/](http://localhost:8000/admin/).
