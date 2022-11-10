from typing import Union
import datetime

from fastapi import FastAPI
from pydantic import BaseModel


class User(BaseModel):
    name: str
    gender: str
    age: int
    zip: Union[None, str] = None
    website_visited: Union[None, str] = None
    username: str
    password: str
