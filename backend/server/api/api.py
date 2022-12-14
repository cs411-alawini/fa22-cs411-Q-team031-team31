from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from psql.models import NewLeg, User
from psql.price import average_round_trip_price, insert_new_leg, average_price_for_start_and_end_location, nunmber_of_flights_inserted_by_user
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
        "https://localhost",
        "*"
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


@app.get("/delete-user/{username}&{password}")
def delete_one_user(username, password):

    print(username, password)
    return delete_user(username, password)


@app.post("/update-user")
def update_one_user(user: User):
    return update_user(user)


@app.get("/average-round-trip-length")
def get_average_round_trip_length():
    return average_round_trip_length()


@app.get("/average-round-trip-price")
def get_average_round_trip_price():
    return average_round_trip_price()


@app.post("/insert-new-leg")
def post_insert_new_leg(new_leg: NewLeg):
    return insert_new_leg(
        username=new_leg.username,
        password=new_leg.password,
        date=new_leg.date,
        start_location=new_leg.start_location,
        end_location=new_leg.end_location,
        carrier=new_leg.carrier,
        price=new_leg.price
    )


@app.get("/average-price")
def get_average_price_for_start_and_end_location():
    return average_price_for_start_and_end_location()


@app.get("/num-flights/{username}")
def get_nunmber_of_flights_inserted_by_user(username):
    return nunmber_of_flights_inserted_by_user(username)
