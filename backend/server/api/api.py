from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from psql.models import User
from psql.price import average_round_trip_price
from psql.route import search_routes, average_round_trip_length
from psql.user import create_user, delete_user, update_user


def get_app():
    return FastAPI()


app = get_app()

# Explanations:
# - https://github.com/axios/axios/issues/4420
# - https://stackoverflow.com/q/65635346/18282722
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost",
        "https://losthost:3000",
        "https://localhost"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def base():
    return {"Hello": "CS411"}


@app.get("/search/{airport}")
def search(airport):
    return search_routes(airport)


@app.post("/create-user")
def create_one_user(user: User):
    return create_user(user)


@app.get("/delete-user/{username}")
def delete_one_user(username):
    return delete_user(username)


@app.post("/update-user")
def update_one_user(user: User):
    return update_user(user)


@app.get("/average-round-trip-length")
def get_average_round_trip_length():
    return average_round_trip_length()


@app.get("/average-round-trip-price")
def get_average_round_trip_price():
    return average_round_trip_price()
