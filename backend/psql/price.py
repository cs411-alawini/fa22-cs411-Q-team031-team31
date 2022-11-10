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
