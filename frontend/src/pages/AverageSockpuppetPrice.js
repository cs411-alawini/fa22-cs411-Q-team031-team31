import {
  Button,
  Divider,
  Flex,
  Group,
  Select,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const sockpuppets = new Set([
  { value: "senior_patagon", label: "Senior 1" },
  { value: "senior", label: "Senior 2" },
  { value: "youth_patagon", label: "Youth 1" },
  { value: "youth", label: "Youth 2" },
  { value: "male_patagon", label: "Male 1" },
  { value: "male", label: "Male 2" },
  { value: "female_patagon", label: "Female 1" },
  { value: "female", label: "Female 2" },
  { value: "control", label: "Control" },
]);

function AverageSockpuppetPrice() {
  const form = useForm({
    initialValues: {
      sockpuppet: "",
    },
    validate: {
      sockpuppet: (sockpuppet) =>
        [...sockpuppets]
          .map((sockpuppet) => sockpuppet.value)
          .includes(sockpuppet)
          ? null
          : "Please select a sockpuppet account",
    },
  });

  const rows = [...sockpuppets].map((sockpuppet) => (
    <tr key={sockpuppet.value}>
      <td>{sockpuppet.label}</td>
      <td>{Math.round(Math.random() * 1_000)}</td>
      <td>{Math.round(Math.random() * 100)}</td>
    </tr>
  ));

  return (
    <>
      <Text>
        Here you can get the average price each sockpuppet account receives.
      </Text>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack align="flex-start">
          <Select
            placeholder="Sockpuppet"
            label="Sockpuppet"
            data={[...sockpuppets]}
            {...form.getInputProps("sockpuppet")}
          />

          <Group>
            <Button type="submit">Calculate Select Sockpuppet</Button>
            <Button>Calculate All</Button>
          </Group>
        </Stack>
      </form>

      <Divider my="sm" />

      <Flex justify="center">
        <Table captionSide="bottom" sx={{ width: 700 }}>
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
    </>
  );
}

export default AverageSockpuppetPrice;
