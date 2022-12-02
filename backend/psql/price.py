import logging

from psql.router import query

def average_round_trip_price():
    SQL = """
SELECT
    name,
    ROUND(AVG(price / 100), 2) AS avg_price,
    COUNT(DISTINCT round_trip_id) AS num_round_trips
FROM
    profile_info
NATURAL JOIN
    pricing_info
GROUP BY
    profile_id
ORDER BY
    avg_price
LIMIT
    15
    """

    round_trip_prices = query(SQL, return_values=True)

    result = [
        {
            "name": round_trip_price[0],
            "avg_price": round_trip_price[1],
            "num_round_trips": round_trip_price[2],
        }
        for round_trip_price in round_trip_prices
    ]

    logging.info("retrieved round trip prices")

    return result


def insert_new_leg(username, password, date, start_location, end_location, carrier, price):
    SQL = f"""
BEGIN;

DO $$

DECLARE leg_id1 INTEGER;
DECLARE leg_id2 INTEGER;
DECLARE trip_id INTEGER;

BEGIN

IF EXISTS (SELECT FROM human_user WHERE username = '{username}') THEN
    INSERT INTO leg_info(
        carrier,
        date,
        time,
        stop_info,
        leg_length,
        start_location,
        end_location
    )
    VALUES (
        '{carrier}',
        '{date.strftime("%Y-%m-%d")}',
        '00:00:00',
        '',
        '0',
        '{start_location}',
        '{end_location}'
    )
    RETURNING leg_id INTO leg_id1;


    INSERT INTO leg_info(
        carrier,
        date,
        time,
        stop_info,
        leg_length,
        start_location,
        end_location
    )
    VALUES (
        '{carrier}',
        '{date.strftime("%Y-%m-%d")}',
        '00:00:00',
        '',
        '0',
        '{end_location}',
        '{start_location}'
    )
    RETURNING leg_id INTO leg_id2;

    INSERT INTO trip_info (
        name,
        leg_id1,
        leg_id2,
        start_location,
        end_location
    )
    VALUES (
        concat('{start_location}', '-', '{end_location}'),
        leg_id1,
        leg_id2,
        '{start_location}',
        '{end_location}'
    )
    RETURNING route_id INTO trip_id;

    INSERT INTO price_info
    VALUES (
        {price},
        '',
        CURRENT_TIMESTAMP,
        trip_id,
        (SELECT id FROM human_user WHERE username = '{username}')
    );
END IF;

end $$;

COMMIT

    """

    query(SQL)

def average_price_for_start_and_end_location():
    SQL = """
SELECT
    start_location,
    end_location,
    AVG(p.price) AS avg_price
FROM
    trip_info as t
JOIN
    price_info as p
ON
    t.route_id = p.trip_info_id
GROUP BY
    start_location, end_location
    """

    prices = query(SQL, return_values=True)

    result = [
        {
            "start_location": price[0],
            "end_location": price[1],
            "avg_price": price[2],
        }
        for price in prices
    ]

    return result


def nunmber_of_flights_inserted_by_user(username):
    SQL = f"""
SELECT
    COUNT(*)
FROM
    trip_info as t
JOIN
    price_info as p
ON
    t.route_id = p.trip_info_id
WHERE
    p.reporter_id = (
        SELECT
            id
        FROM
            human_user
        WHERE
            username = '{username}'
    )
    """

    count = query(SQL, return_values=True)[0][0]

    return count
