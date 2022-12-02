import {
  Button,
  Divider,
  Flex,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";

const BUTTON_WIDTH = 300;

const airports = new Set([
  { abbreviation: "AFW", name: "Fort Worth Alliance Airport" },
  {
    abbreviation: "ATL",
    name: "Hartsfield-Jackison Atlanta International Airport",
  },
  { abbreviation: "AUS", name: "Austin-Bergstrom International Airport" },
  { abbreviation: "AZA", name: "Phoenix-Mesa Gateway Airport" },
  { abbreviation: "BDL", name: "Bradley International Airport" },
  { abbreviation: "BNA", name: "Nashville International Airport" },
  { abbreviation: "BUF", name: "Buffalo Niagara International Airport" },
  { abbreviation: "BUR", name: "Hollywood Burbank Airport" },
  { abbreviation: "BWI", name: "Baltimore-Washington International Airport" },
  { abbreviation: "BZN", name: "Bozeman Yellowstone International Airport" },
  { abbreviation: "CHI", name: "Union Station" },
  { abbreviation: "CLT", name: "Charlotte Douglas International Airport" },
  { abbreviation: "CMH", name: "John Glenn Columbus International Airport" },
  { abbreviation: "DEN", name: "Denver International Airport" },
]);

function SearchLegs() {
  const form = useForm({
    initialValues: {
      airport: "",
    },
    validate: {
      airport: (airport) =>
        [...airports].map((airport) => airport.abbreviation).includes(airport)
          ? null
          : "Please type an appropriate airport abbrevation",
    },
  });

  const [showTable, setShowTable] = useState(false);
  const [rows, setRows] = useState(null);

  async function handleOnSubmit(values) {
    const response = await axios
      .get(`https://backend-z2wzushc7q-uc.a.run.app/search/${values.airport}`)
      .catch((error) => console.log(error));

    form.reset();

    setRows(
      response.data.map((data) => (
        <tr key={data.leg_id}>
          <td>{data.leg_id}</td>
          <td>{data.start_location}</td>
          <td>{data.end_location}</td>
          <td>{data.carrier}</td>
          <td>{data.date}</td>
          <td>{data.time}</td>
          <td>{data.leg_length}</td>
        </tr>
      ))
    );

    setShowTable(true);
  }

  return (
    <>
      <Text>
        Here you can search the possible legs for a particular airport. Please
        enter one of the codes (case sensitive) associated with an airport.
      </Text>
      <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
        <Stack align="flex-start">
          <TextInput
            withAsterisk
            label="Airport Abbreviation"
            placeholder="Airport Abbrevation"
            sx={{ width: BUTTON_WIDTH }}
            {...form.getInputProps("airport")}
          />
          <Button type="submit">Search</Button>
        </Stack>
      </form>

      {showTable && (
        <>
          <Divider my="sm" />
          <Flex justify="center">
            <Table captionSide="bottom" sx={{ width: 1_000 }}>
              <caption>
                This table shows the possible legs for a particular searched
                flight.
              </caption>
              <thead>
                <tr>
                  <th>Leg ID</th>
                  <th>Starting Location</th>
                  <th>Ending Location</th>
                  <th>Carrier</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Leg Length</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Flex>
        </>
      )}

      <Divider my="sm" />
      <Flex justify="center">
        <Table captionSide="bottom" sx={{ width: 600 }}>
          <caption>
            This table presents the possible airports you can search. Please
            type one of the abbreviations in the text box above.
          </caption>
          <thead>
            <tr>
              <th>Airport</th>
              <th>Abbrevation</th>
            </tr>
          </thead>
          <tbody>
            {[...airports].map((airport) => (
              <tr key={airport.abbreviation}>
                <td>{airport.name}</td>
                <td>{airport.abbreviation}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Flex>
    </>
  );
}

export default SearchLegs;
