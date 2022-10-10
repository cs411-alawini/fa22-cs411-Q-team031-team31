from psql.client import query

import logging


def init_database():
    init_user_table()


def init_user_table():
    SQL = """
CREATE TABLE IF NOT EXISTS human_user (
   id INTEGER NOT NULL,
   name VARCHAR(50) NOT NULL,
   gender VARCHAR(10) NOT NULL,
   age INT NOT NULL,
   zip VARCHAR(10),
   website_visited VARCHAR(250),
   user_id VARCHAR(100) NOT NULL,
   password VARCHAR(100) NOT NULL,

   PRIMARY KEY (id)
);
    """

    query(SQL)

    logging.info("initiated a 'user' table")
