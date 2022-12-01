import { Text, Title, Tabs, Space, Group } from "@mantine/core";
import AverageRoundTripLength from "./pages/AverageRoundTripLength";
import AverageSockpuppetPrice from "./pages/AverageSockpuppetPrice";
import SearchLegs from "./pages/SearchLegs";
import Users from "./pages/Users";

function App() {
  return (
    <>
      <Group position="apart">
        <Title order={1}>CS 411 Team 31 Frontend</Title>
      </Group>

      <Space h="xs" />

      <Tabs variant="outline" defaultValue="home">
        <Tabs.List>
          <Tabs.Tab value="home">Home</Tabs.Tab>
          <Tabs.Tab value="users">Modify Users</Tabs.Tab>
          <Tabs.Tab value="average round trip length">
            Average Round Trip Length
          </Tabs.Tab>
          <Tabs.Tab value="average sockpuppet price">
            Average Sockpuppet Price
          </Tabs.Tab>
          <Tabs.Tab value="search legs">Search Legs</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="home" pt="xs">
          <Text>
            This is the frontend interface that will allow you to query and
            update a database containing scrapped flight data for Kayak.com
            using various sockpuppet accounts. In addition to analyzing the
            sockpuppet prices, you can enter your information and flight prices
            for the database.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="users" pt="xs">
          <Users />
        </Tabs.Panel>
        <Tabs.Panel value="average round trip length" pt="xs">
          <AverageRoundTripLength />
        </Tabs.Panel>
        <Tabs.Panel value="average sockpuppet price" pt="xs">
          <AverageSockpuppetPrice />
        </Tabs.Panel>
        <Tabs.Panel value="search legs" pt="xs">
          <SearchLegs />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default App;
