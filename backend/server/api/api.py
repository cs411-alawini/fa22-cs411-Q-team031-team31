from fastapi import FastAPI


def get_app():
    return FastAPI()


app = get_app()


@app.get("/")
def base():
    return {"Hello": "CS411"}
