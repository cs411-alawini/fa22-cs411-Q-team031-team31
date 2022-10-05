import sys
import uvicorn
from fastapi import FastAPI


def app():
    return FastAPI()


def get_command_line_args():
    args = sys.argv

    assert len(args) == 3, "both host and port have to be passed"

    host, port = args[1:3]
    return host, int(port)


def main():
    host, port = get_command_line_args()
    app = FastAPI()

    uvicorn.run(app, host=host, port=port)


if __name__ == "__main__":
    main()
