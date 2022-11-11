import string
from psql.models import User
from psql.router import query
from psql.utils import stringify

import logging


def create_user(user: User):

    SQL = f"""
INSERT INTO human_user(
    name,
    gender,
    age,
    zip,
    website_visited,
    username,
    password
)
VALUES (
    {stringify(user.name)},
    {stringify(user.gender)},
    {stringify(user.age)},
    {stringify(user.zip)},
    {stringify(user.website_visited)},
    {stringify(user.username)},
    {stringify(user.password)}
)
    """

    query(SQL)

    logging.info(f"created a user: '{user.username}'")


def delete_user(username: str):
    SQL = f"DELETE FROM human_user WHERE username = '{username}'"

    query(SQL)

    logging.info(f"deleted a user: '{username}'")


def update_user(user: User):
    SQL = f"""
UPDATE human_user
SET
    name = {stringify(user.name)},
    gender = {stringify(user.gender)},
    age = {stringify(user.age)},
    zip = {stringify(user.zip)},
    website_visited = {stringify(user.website_visited)},
    username = {stringify(user.username)},
    password = {stringify(user.password)}
WHERE
    username = {stringify(user.username)}
    """

    query(SQL)

    logging.info(f"updated a user: '{user.username}'")
