import { Button, Divider, Flex, Space, Table, Text } from "@mantine/core";
import axios from "axios";
import { useState } from "react";

const sockpuppets = {
  senior_patagon: "Senior 1",
  senior: "Senior 2",
  youth_patagon: "Youth 1",
  youth: "Youth 2",
  male_patagon: "Male 1",
  male: "Male 2",
  female_patagon: "Female 1",
  female: "Female 2",
  control: "Control",
};

function AverageSockpuppetPrice() {
  const [showTable, setShowTable] = useState(false);

  const [rows, setRows] = useState(null);

  async function handleOnClick() {
    const response = await axios
      .get("https://backend-z2wzushc7q-uc.a.run.app/average-round-trip-price")
      .catch((error) => console.log(error));

    setRows(
      response.data.map((data) => (
        <tr key={data.name}>
          <td>{sockpuppets[data.name]}</td>
          <td>${data.avg_price}</td>
          <td>{data.num_round_trips.toLocaleString()}</td>
        </tr>
      ))
    );

    setShowTable(true);
  }

  return (
    <>
      <Text>
        Here you can get the average price each sockpuppet account receives.
      </Text>

      <Space my="sm" />

      <Button onClick={() => handleOnClick()}>
        Calculate Average Sockpuppet Price
      </Button>

      <Divider my="sm" />

      {showTable && (
        <Flex justify="center">
          <Table captionSide="bottom" sx={{ width: 500 }}>
            <caption>
              The average roundtrip proce and the number of round trips each
              sockpuppet account has made.
            </caption>
            <thead>
              <tr>
                <th>Sockpuppet</th>
                <th>Average Price</th>
                <th>Number of Round Trips</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Flex>
      )}
    </>
  );
}

export default AverageSockpuppetPrice;
