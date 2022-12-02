import {
  Button,
  Flex,
  NumberInput,
  PasswordInput,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";

const INPUT_WIDTH = 300;

function AddFlights() {
  const addForm = useForm({
    initialValues: {
      username: "",
      password: "",
      date: null,
      start_location: "",
      end_location: "",
      carrier: "",
      price: 0,
    },
    validate: {
      username: (username) =>
        username.length <= 100 && username.length !== 0
          ? null
          : "Username is either too long or empty",
      password: (password) =>
        password.length <= 100 && password.length !== 0
          ? null
          : "Password is either too long or empty",
      start_location: (start_location) =>
        start_location <= 100 && start_location.length !== 0
          ? null
          : "Start location is either too long or empty",
      end_location: (end_location) =>
        end_location <= 100 && end_location.length !== 0
          ? null
          : "End location is either too long or empty",
      carrier: (carrier) =>
        carrier.length <= 100 && carrier.length !== 0
          ? null
          : "Carrier is either too long or empty",
      price: (price) => (price > 0 ? null : "Price must be above zero"),
      date: (date) => (date !== null ? null : "Please select a date"),
    },
  });

  async function handleAddOnSubmit(values) {
    console.log(values);
    // const response = await axios
    //   .post("http://localhost:8888/add-flight", values)
    //   .then(() => addForm.reset())
    //   .catch((error) => console.log(error));
  }

  const [showCount, setShowCount] = useState(false);
  const [countText, setCountText] = useState("");

  const countForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (username) =>
        username.length <= 100 && username.length !== 0
          ? null
          : "Username is either too long or empty",
      password: (password) =>
        password.length <= 100 && password.length !== 0
          ? null
          : "Password is either too long or empty",
    },
  });

  async function handleCountOnSubmit(values) {
    const response = await axios
      .get(`http://localhost:8888/num-flights/${values.username}`)
      .catch((error) => console.log(error));

    setShowCount(true);
    setCountText(
      `This ${values.username} has submitted ${response.data} round trips.`
    );

    countForm.reset();
  }

  const [showTable, setShowTable] = useState(false);
  const [rows, setRows] = useState(null);

  const averageForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (username) =>
        username.length <= 100 && username.length !== 0
          ? null
          : "Username is either too long or empty",
      password: (password) =>
        password.length <= 100 && password.length !== 0
          ? null
          : "Password is either too long or empty",
    },
  });

  async function handleAverageOnSubmit(values) {
    console.log(values);
    setShowTable(true);
    // Set the rows to something.

    // const response = await axios
    //   .get("https://localhost:8888/get-round-trips", values)
    //   .then(() => countForm.reset())
    //   .catch((error) => console.log(error));
  }

  return (
    <>
      <Stack>
        <Text>
          Here you can add and view flight statistics for a given user. First,
          please provide an appropriate username and password.
        </Text>
        <Title order={2}>Add Round Trip</Title>
        <form
          onSubmit={addForm.onSubmit((values) => handleAddOnSubmit(values))}
        >
          <Stack align="flex-start" sx={{ maxWidth: 300 }}>
            <TextInput
              withAsterisk
              label="Username"
              placeholder="Username"
              {...addForm.getInputProps("username")}
              sx={{ width: INPUT_WIDTH }}
            />

            <PasswordInput
              withAsterisk
              placeholder="Password"
              label="Password"
              {...addForm.getInputProps("password")}
              sx={{ width: INPUT_WIDTH }}
            />

            <DatePicker
              placeholder="Round trip date"
              label="Round trip date"
              withAsterisk
              {...addForm.getInputProps("date")}
              sx={{ width: INPUT_WIDTH }}
            />

            <TextInput
              label="Start location"
              placeholder="Start location"
              withAsterisk
              {...addForm.getInputProps("start_location")}
              sx={{ width: INPUT_WIDTH }}
            />

            <TextInput
              label="End location"
              placeholder="End location"
              withAsterisk
              {...addForm.getInputProps("end_location")}
              sx={{ width: INPUT_WIDTH }}
            />

            <TextInput
              label="Carrier"
              placeholder="Carrier"
              withAsterisk
              {...addForm.getInputProps("carrier")}
              sx={{ width: INPUT_WIDTH }}
            />

            <NumberInput
              label="Price"
              {...addForm.getInputProps("price")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : "$ "
              }
              hideControls
              sx={{ width: INPUT_WIDTH }}
            />

            <Button type="submit">Add Flight</Button>
          </Stack>
        </form>

        <Title order={2}>Total Round Trips Added</Title>
        <form
          onSubmit={countForm.onSubmit((values) => handleCountOnSubmit(values))}
        >
          <Stack align="flex-start" sx={{ maxWidth: 300 }}>
            <TextInput
              withAsterisk
              label="Username"
              placeholder="Username"
              {...countForm.getInputProps("username")}
              sx={{ width: INPUT_WIDTH }}
            />

            <PasswordInput
              withAsterisk
              placeholder="Password"
              label="Password"
              {...countForm.getInputProps("password")}
              sx={{ width: INPUT_WIDTH }}
            />

            <Button type="submit">Count Round Trips</Button>
          </Stack>
        </form>

        {showCount && <Text>{countText}</Text>}

        <Title order={2}>Average Round Trips Price</Title>
        {/* <form
          onSubmit={averageForm.onSubmit((values) =>
            handleAverageOnSubmit(values)
          )}
        >
          <Stack align="flex-start" sx={{ maxWidth: 300 }}>
            <TextInput
              withAsterisk
              label="Username"
              placeholder="Username"
              {...averageForm.getInputProps("username")}
              sx={{ width: INPUT_WIDTH }}
            />

            <PasswordInput
              withAsterisk
              placeholder="Password"
              label="Password"
              {...averageForm.getInputProps("password")}
              sx={{ width: INPUT_WIDTH }}
            />

            <Button type="submit">Calculate Average Round Trip Price</Button>
          </Stack>
        </form> */}

        <Stack align="flex-start">
          <Button
            onClick={async () => {
              const response = await axios
                .get("http://localhost:8888/average-price")
                .catch((error) => console.log(error));

              setRows(
                response.data.map((data) => {
                  return (
                    <tr key={data.start_location + "-" + data.end_location}>
                      <td>{data.start_location}</td>
                      <td>{data.end_location}</td>
                      <td>${data.avg_price.toLocaleString("en-US")}</td>
                    </tr>
                  );
                })
              );

              setShowTable(true);
            }}
          >
            Calculate Average Round Trip Price
          </Button>
        </Stack>

        {showTable && (
          <Flex justify="center">
            <Table captionSide="bottom" sx={{ width: 600 }}>
              <caption>
                This table presents the average price for each round trip for a
                particular user submitted.
              </caption>
              <thead>
                <tr>
                  <th>Starting Location</th>
                  <th>End Location</th>
                  <th>Average Round Trip Price</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Flex>
        )}
      </Stack>
    </>
  );
}

export default AddFlights;
