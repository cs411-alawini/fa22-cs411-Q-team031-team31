import {
  Button,
  NumberInput,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

const INPUT_WIDTH = 300;

const genderOptions = [
  { label: "Female", value: "F" },
  { label: "Male", value: "M" },
  { label: "Transgender", value: "T" },
  { label: "Non-binary/non-comforming", value: "NB" },
  { label: "Prefer not to responds", value: "NA" },
];

function ModifyUser() {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      name: "",
      age: 18,
      gender: "NB",
      website_visited: "",
      zip: "61820",
    },
    validate: {
      username: (username) =>
        username.length <= 100 ? null : "Username is too long",
      password: (password) =>
        password.length <= 100 ? null : "Password is too long",
      name: (name) => (name.length <= 100 ? null : "Name is too long"),
      gender: (gender) =>
        genderOptions.map((gender) => gender.value).includes(gender)
          ? null
          : "Not a gender option",

      age: (age) => (age >= 18 ? null : "Age too low"),
      zip: (zip) => (zip.length <= 10 ? null : "ZIP code too long"),
      website_visited: (website_visited) =>
        website_visited.length <= 100 ? null : "List too long",
    },
  });

  async function handleOnSubmit(values) {
    const response = await axios
      .post("https://backend-z2wzushc7q-uc.a.run.app/update-user", values)
      .then(() => form.reset())
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Text>
        Please enter the correct credentials for the user and the new websites
        visited to update.
      </Text>

      <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
        <Stack align="flex-start" sx={{ maxWidth: 300 }}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Username"
            {...form.getInputProps("username")}
            sx={{ width: INPUT_WIDTH }}
          />

          <PasswordInput
            withAsterisk
            placeholder="Password"
            label="Password"
            {...form.getInputProps("password")}
            sx={{ width: INPUT_WIDTH }}
          />

          <TextInput
            withAsterisk
            label="Name"
            placeholder="Full Name"
            {...form.getInputProps("name")}
            sx={{ width: INPUT_WIDTH }}
          />

          <Select
            label="Gender"
            placeholder="Prefer not to respond"
            data={genderOptions}
            {...form.getInputProps("gender")}
            sx={{ width: INPUT_WIDTH }}
          />

          <NumberInput
            defaultValue={18}
            placeholder="Your age"
            label="Your age"
            {...form.getInputProps("age")}
            sx={{ width: INPUT_WIDTH }}
          />

          <TextInput
            label="Websites visited"
            placeholder="reddit.com, github.com, facebook.com"
            {...form.getInputProps("website_visited")}
            sx={{ width: INPUT_WIDTH }}
          />

          <TextInput
            label="ZIP code"
            placeholder="61820"
            {...form.getInputProps("zip")}
            sx={{ width: INPUT_WIDTH }}
          />

          <Button type="submit">Modify Websites Visited</Button>
        </Stack>
      </form>
    </>
  );
}

export default ModifyUser;
