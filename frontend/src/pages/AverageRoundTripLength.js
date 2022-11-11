import { Text, Button, Table, Divider, Flex, Space } from "@mantine/core";
import axios from "axios";
import { useState } from "react";

const startingLocations = {
  AFW: "Fort Worth Alliance Airport",
  ATL: "Hartsfield-Jackison Atlanta International Airport",
  AUS: "Austin-Bergstrom International Airport",
  AZA: "Phoenix-Mesa Gateway Airport",
  BDL: "Bradley International Airport",
  BNA: "Nashville International Airport",
  BUF: "Buffalo Niagara International Airport",
  BUR: "Hollywood Burbank Airport",
  BWI: "Baltimore-Washington International Airport",
  BZN: "Bozeman Yellowstone International Airport",
  CHI: "Union Station",
  CLT: "Charlotte Douglas International Airport",
  CMH: "John Glenn Columbus International Airport",
  DEN: "Denver International Airport",
};

function AverageRoundTripLength() {
  const [showTable, setShowTable] = useState(false);

  const [rows, setRows] = useState(null);

  async function handleOnClick() {
    const response = await axios
      .get("http://localhost:8888/average-round-trip-length")
      .catch((error) => console.log(error));

    setRows(
      response.data.map((data) => {
        // No idea what that start location is.
        if (data.start_location === "9MY") return null;

        return (
          <tr key={data.start_location}>
            <td>{data.start_location}</td>
            <td>{startingLocations[data.start_location]}</td>
            <td>{data.avg_round_trip_length}</td>
          </tr>
        );
      })
    );

    setShowTable(true);
  }

  return (
    <>
      <Text>
        Here you can get the average round trip time for a particular starting
        location/airport.
      </Text>

      <Space my="sm" />

      <Button onClick={() => handleOnClick()}>
        Calculate Average Round Trip Length
      </Button>

      <Divider my="sm" />

      {showTable && (
        <Flex justify="center">
          <Table captionSide="bottom" sx={{ width: 700 }}>
            <caption>
              This table presents the average round trip duration for each
              starting location in the database.
            </caption>
            <thead>
              <tr>
                <th>Starting Location</th>
                <th>Full Name</th>
                <th>Average Round Trip Time</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Flex>
      )}
    </>
  );
}

export default AverageRoundTripLength;
