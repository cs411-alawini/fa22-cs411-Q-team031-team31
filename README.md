# Q-team031-team31

## Backend Setup

1. Install Python lint: `pip install pre-commit`. This will check the code formatting before every commit. Additionally, please follow the `flake8` linting rules for readability.
1. Install the development environment:
   1. Install Docker: https://www.docker.com/products/docker-desktop/
   1. Run `make build-backend` in the root directory.
   1. Run `docker-compose up`.
   1. Check if you see the following in your terminal:

![Backend Sanity Check](https://user-images.githubusercontent.com/103418311/194102191-cd2c3c82-f965-412a-bcb7-faaa1f449a1e.png)

## Frontend Setup

1. Install NodeJS.
1. Run `npm start` in the `./frontend` directory. A new tab should be opened containing the frontend.

## Tips

In order to open the Postgresql in the docker, use
`docker exec -it postgres psql -U postgres -P postgres`
