import {
  Text,
  Title,
  Tabs,
  Space,
  Group,
  Button,
  Modal,
  TextInput,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import AddUsers from "./pages/AddUsers";
import AverageRoundTripLength from "./pages/AverageRoundTripLength";
import AverageSockpuppetPrice from "./pages/AverageSockpuppetPrice";

function App() {
  const [opened, setOpened] = useState(false);
  const loginForm = useForm({
    initialValues: {
      name: "",
      password: "",
    },
  });

  return (
    <>
      <Group position="apart">
        <Title order={1}>CS 411 Team 31 Frontend</Title>
        <Button onClick={() => setOpened(true)}>Login</Button>
      </Group>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Login">
        <form onSubmit={loginForm.onSubmit((values) => console.log(values))}>
          <Stack spacing="md">
            <Text>
              If you don't have an account in the database, please make one in
              the Add User tab.
            </Text>

            <TextInput withAsterisk label="Name" placeholder="Name" />
            <TextInput withAsterisk label="Password" placeholder="Password" />

            <Button type="submit" sx={{ width: 90 }}>
              Login
            </Button>
          </Stack>
        </form>
      </Modal>

      <Space h="xs" />

      <Tabs variant="outline" defaultValue="home">
        <Tabs.List>
          <Tabs.Tab value="home">Home</Tabs.Tab>
          <Tabs.Tab value="add user">Add User</Tabs.Tab>
          <Tabs.Tab value="average round trip length">
            Average Round Trip Length
          </Tabs.Tab>
          <Tabs.Tab value="average sockpuppet price">
            Average Sockpuppet Price
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="home" pt="xs">
          <Text>Home Content</Text>
        </Tabs.Panel>
        <Tabs.Panel value="add user" pt="xs">
          <AddUsers />
        </Tabs.Panel>
        <Tabs.Panel value="average round trip length" pt="xs">
          <AverageRoundTripLength />
        </Tabs.Panel>
        <Tabs.Panel value="average sockpuppet price" pt="xs">
          <AverageSockpuppetPrice />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default App;
