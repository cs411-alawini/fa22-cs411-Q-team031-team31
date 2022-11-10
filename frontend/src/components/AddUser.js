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

const BUTTON_WIDTH = 300;

const genderOptions = [
  "female",
  "male",
  "transgender",
  "non-binary/non-conforming",
  "prefer not to respond",
];

function AddUsers() {
  const form = useForm({
    initialValues: {
      name: "",
      gender: "prefer not to respond",
      age: 18,
      zipCode: 61820,
      websiteVisited: "",
      password: "",
    },
    validate: {
      name: (name) => (name.length <= 100 ? null : "Name is too long"),
      gender: (gender) =>
        genderOptions.includes(gender) ? null : "Not a gender option",
      age: (age) => (age >= 18 ? null : "Age too low"),
      zipCode: (zipCode) =>
        zipCode.toString().length <= 10 ? null : "Zipcode too long",
      websiteVisited: (websiteVisited) =>
        websiteVisited.length <= 100 ? null : "List too long",
      password: (password) =>
        password.length <= 100 ? null : "Password is too long",
    },
  });

  return (
    <>
      <Text>Please enter the information required to input a user.</Text>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack align="flex-start" sx={{ maxWidth: 300 }}>
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
            data={[
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
              { value: "transgender", label: "Transgender" },
              {
                value: "non-binary/non-conforming",
                label: "Non-binary/non-conforming",
              },
              {
                value: "prefer not to respond",
                label: "Prefer not to respond",
              },
            ]}
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

          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            {...form.getInputProps("password")}
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

export default AddUsers;
