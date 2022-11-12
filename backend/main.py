import logging
import sys
import uvicorn

from server.api.api import app
from psql.tables import init_database

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def get_command_line_args():
    args = sys.argv

    assert len(args) == 3, "both host and port have to be passed"

    host, port = args[1:3]
    return host, int(port)


def main():
    host, port = get_command_line_args()

    logger.info("Initiating the database")
    init_database()

    uvicorn.run("server.api.api:app", host=host, port=port, reload=True)


if __name__ == "__main__":
    main()
