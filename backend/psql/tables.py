from psql.router import query

import logging


def init_database():
    init_leg_info_table()
    init_round_trip_info_table()
    init_price_info_table()

    init_profile_table()
    init_human_user_table()
    init_automated_agent_table()

    create_profile_trigger()


def init_leg_info_table():
    SQL = """
CREATE TABLE IF NOT EXISTS leg_info (
    leg_id INTEGER NOT NULL,
    carrier VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(100),
    stop_info VARCHAR(200),
    leg_length VARCHAR(200),
    start_location VARCHAR(200),
    end_location VARCHAR(200),

    PRIMARY KEY (leg_id)
)
    """

    query(SQL)

    logging.info("initiated a 'leg_info' table")


def init_round_trip_info_table():
    SQL = """
CREATE TABLE IF NOT EXISTS trip_info (
    route_id INTEGER NOT NULL,
    name VARCHAR(250) NOT NULL,
    leg_id1 INTEGER NOT NULL,
    leg_id2 INTEGER NOT NULL,
    start_location VARCHAR(200) NOT NULL,
    end_location VARCHAR(200) NOT NULL,

    PRIMARY KEY (route_id),
    CONSTRAINT fk_leg_1 FOREIGN KEY (leg_id1) REFERENCES leg_info(leg_id),
    CONSTRAINT fk_leg_2 FOREIGN KEY (leg_id2) REFERENCES leg_info(leg_id)
)
    """

    query(SQL)

    logging.info("initiated a 'round_trip_info' table")


def init_price_info_table():
    SQL = """
CREATE TABLE IF NOT EXISTS price_info (
    price INTEGER NOT NULL,
    seller VARCHAR(250) NOT NULL,
    search_time TIMESTAMP
)
    """

    query(SQL)

    logging.info("initiated a 'price_info' table")


def init_profile_table():
    SQL = """
CREATE TABLE IF NOT EXISTS profile (
    id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,

    PRIMARY KEY(id)
)
    """

    query(SQL)

    logging.info("initiated a 'profile' table")


def init_automated_agent_table():
    SQL = """
CREATE TABLE IF NOT EXISTS automated_agent (
    id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    age INTEGER NOT NULL,
    zip VARCHAR(10) NOT NULL,
    website_visited VARCHAR(250),

    PRIMARY KEY(id),

    CONSTRAINT fk_profile FOREIGN KEY (id) REFERENCES profile(id)
)
    """

    query(SQL)

    logging.info("initiated a 'automated_agent' table")


def init_human_user_table():
    SQL = """
CREATE TABLE IF NOT EXISTS human_user (
   id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   gender VARCHAR(10) NOT NULL,
   age INT NOT NULL,
   zip VARCHAR(10),
   website_visited VARCHAR(250),
   username VARCHAR(100) NOT NULL UNIQUE,
   password VARCHAR(100) NOT NULL,

   CONSTRAINT fk_profile FOREIGN KEY (id) REFERENCES profile(id)
);
    """

    query(SQL)

    logging.info("initiated a 'human_user' table")


def create_profile_trigger():
    SQL = """
CREATE OR REPLACE FUNCTION create_profile() RETURNS TRIGGER AS $example_table$
   BEGIN
      INSERT INTO profile(id, name) VALUES (new.id, new.name);
      RETURN NEW;
   END;
$example_table$ LANGUAGE plpgsql;    

CREATE OR REPLACE TRIGGER profile_creation_trigger BEFORE INSERT ON human_user
FOR EACH ROW EXECUTE PROCEDURE create_profile();
    """

    query(SQL)

    logging.info("initiated a 'profile_trigger'")
