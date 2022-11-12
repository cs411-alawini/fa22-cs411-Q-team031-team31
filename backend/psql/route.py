import logging

from psql.router import query
from psql.utils import stringify


def search_routes(airport):
    SQL = f"""
SELECT 
    leg_id,
    carrier,
    date,
    time,
    stop_info,
    leg_length,
    start_location,
    end_location
FROM
    leg_info
WHERE
    start_location = {stringify(airport)}
    OR end_location = {stringify(airport)}
LIMIT
    10
    """

    routes = query(SQL, return_values=True)

    result = [
        {
            "leg_id": route[0],
            "carrier": route[1],
            "date": route[2],
            "time": route[3],
            "stop_info": route[4],
            "leg_length": route[5],
            "start_location": route[6],
            "end_location": route[7],
        }
        for route in routes
    ]

    logging.info(f"searched routes for '{airport}'")

    return result


def average_round_trip_length():
    SQL = f"""
SELECT
    start_location,
    AVG(leg_1_length + leg_2_length) AS avg_round_trip_length
FROM (
    SELECT
        start_location,
        (
            SELECT
                CAST(leg_length AS INTERVAL)
            FROM
                leg_info
            WHERE
                leg_id = leg_id1
        ) AS leg_1_length,
        (
            SELECT
                CAST(leg_length AS INTERVAL)
            FROM
                leg_info
            WHERE
                leg_id = leg_id2
        ) AS leg_2_length
    FROM
        round_trip_info
) AS t
GROUP BY
    start_location
LIMIT
    15;
    """

    routes = query(SQL, return_values=True)

    result = [
        {
            "start_location": route[0],
            "avg_round_trip_length": route[1],
        }
        for route in routes
    ]

    logging.info(f"get 'average_round_trip_length'")

    return result
