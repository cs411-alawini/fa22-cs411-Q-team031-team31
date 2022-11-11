import {
  Text,
  TextInput,
  Button,
  Stack,
  Select,
  NumberInput,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

const BUTTON_WIDTH = 300;

const genderOptions = [
  { label: "Female", value: "F" },
  { label: "Male", value: "M" },
  { label: "Transgender", value: "T" },
  { label: "Non-binary/non-comforming", value: "NB" },
  { label: "Prefer not to responsd", value: "NA" },
];

function AddUser() {
  const form = useForm({
    initialValues: {
      username: "",
      name: "",
      gender: "NB",
      age: 18,
      zipCode: 61820,
      websiteVisited: "",
      password: "",
    },
    validate: {
      username: (username) =>
        username.length <= 100 ? null : "Username is too long",
      name: (name) => (name.length <= 100 ? null : "Name is too long"),
      gender: (gender) =>
        genderOptions.map((gender) => gender.value).includes(gender)
          ? null
          : "Not a gender option",
      age: (age) => (age >= 18 ? null : "Age too low"),
      zipCode: (zipCode) =>
        zipCode.toString().length <= 10 ? null : "Zipcode too long",
      websiteVisited: (websiteVisited) =>
        websiteVisited.length <= 100 ? null : "List too long",
      password: (password) =>
        password.length <= 100 ? null : "Password is too long",
    },
  });

  async function handleOnSubmit(values) {
    const response = await axios.post(
      "http://localhost:8888/create-user",
      values
    );
  }

  return (
    <>
      <Text>Please enter the information required to input a user.</Text>
      <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
        <Stack align="flex-start" sx={{ maxWidth: 300 }}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Username"
            {...form.getInputProps("username")}
            sx={{ width: BUTTON_WIDTH }}
          />

          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            {...form.getInputProps("password")}
            sx={{ width: BUTTON_WIDTH }}
          />

          <TextInput
            withAsterisk
            label="Name"
            placeholder="Full Name"
            {...form.getInputProps("name")}
            sx={{ width: BUTTON_WIDTH }}
          />

          <Select
            label="Gender"
            placeholder="prefer not to respond"
            data={genderOptions}
            {...form.getInputProps("gender")}
            sx={{ width: BUTTON_WIDTH }}
          />

          <NumberInput
            defaultValue={18}
            placeholder="Your age"
            label="Your age"
            withAsterisk
            {...form.getInputProps("age")}
            sx={{ width: BUTTON_WIDTH }}
          />

          <TextInput
            label="Websites visited"
            placeholder="reddit.com, github.com, facebook.com"
            {...form.getInputProps("websiteVisited")}
            sx={{ width: BUTTON_WIDTH }}
          />

          <TextInput
            label="Zipcode"
            placeholder="61820"
            {...form.getInputProps("zipCode")}
            sx={{ width: BUTTON_WIDTH }}
          />

          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </>
  );
}

export default AddUser;
