import {
  Group,
  Select,
  Text,
  Button,
  Stack,
  Table,
  Divider,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const BUTTON_WIDTH = 400;

const startingLocations = new Set([
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

function AverageRoundTripLength() {
  const form = useForm({
    initialValues: {
      startingLocation: "",
    },
    validate: {
      startingLocation: (location) =>
        [...startingLocations]
          .map((location) => location.abbreviation)
          .includes(location)
          ? null
          : "Please select a starting location",
    },
  });

  const rows = [...startingLocations].map((location) => (
    <tr key={location.abbreviation}>
      <td>
        {location.name} ({location.abbreviation})
      </td>
      <td>{Math.round(Math.random() * 100)}</td>
    </tr>
  ));

  return (
    <>
      <Text>
        Here you can get the average round trip time for a particular starting
        location/airport.
      </Text>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack align="flex-start">
          <Select
            placeholder="Starting Location"
            label="Starting Location"
            data={[...startingLocations].map((location) => ({
              value: location.abbreviation,
              label: `${location.name} (${location.abbreviation})`,
            }))}
            sx={{ width: BUTTON_WIDTH }}
            {...form.getInputProps("startingLocation")}
          />

          <Group>
            <Button type="submit">Calculate Selected Location</Button>
            <Button>Calculate All</Button>
          </Group>
        </Stack>
      </form>

      <Divider my="sm" />

      <Flex justify="center">
        <Table captionSide="bottom" sx={{ width: 700 }}>
          <caption>
            This table presents the average round trip duration for each
            starting location in the database.
          </caption>
          <thead>
            <tr>
              <th>Starting Location</th>
              <th>Average Round Trip Time</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Flex>
    </>
  );
}

export default AverageRoundTripLength;
