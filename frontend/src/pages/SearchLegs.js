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

  return (
    <>
      <Text>
        Here you can search the possible legs for a particular airport. Please
        enter one of the codes (case sensitive) associated with an airport.
      </Text>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
