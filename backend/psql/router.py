from os import environ

import psycopg2


def get_conn():
    host = environ["POSTGRES_HOST"]
    dbname = environ["POSTGRES_NAME"]
    user = environ["POSTGRES_USER"]
    password = environ["POSTGRES_PASSWORD"]

    return psycopg2.connect(dbname=dbname, user=user, password=password, host=host)


# query executes the passed SQL
# if return_values is set true, it returns the SQL result as a list of rows
def query(SQL: str, return_values: bool = False):
    with get_conn() as conn:
        with conn.cursor() as curs:
            curs.execute(SQL)

            if return_values:
                return curs.fetchall()
