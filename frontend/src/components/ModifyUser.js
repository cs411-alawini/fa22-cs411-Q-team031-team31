import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const INPUT_WIDTH = 300;

function ModifyUser() {
  const form = useForm({
    initialValues: {
      name: "",
      password: "",
      websitesVisited: "",
    },
    validate: {
      name: (name) => (name.length <= 100 ? null : "Name is too long"),
      password: (password) =>
        password.length <= 100 ? null : "Password is too long",
      websitesVisited: (websiteVisited) =>
        websiteVisited.length <= 100 ? null : "List too long",
    },
  });

  return (
    <>
      <Text>
        Please enter the correct credentials for the user and the new websites
        visited to update.
      </Text>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack align="flex-start" sx={{ maxWidth: 300 }}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Full Name"
            {...form.getInputProps("name")}
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
            label="Websites visited"
            placeholder="reddit.com, github.com, facebook.com"
            {...form.getInputProps("websitesVisited")}
            sx={{ width: INPUT_WIDTH }}
          />

          <Button type="submit">Modify Websites Visited</Button>
        </Stack>
      </form>
    </>
  );
}

export default ModifyUser;
