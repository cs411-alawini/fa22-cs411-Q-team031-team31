import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

const INPUT_WIDTH = 300;

function DeleteUser() {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (name) => (name.length <= 100 ? null : "Name is too long"),
      password: (password) =>
        password.length <= 100 ? null : "Password is too long",
    },
  });

  async function handleOnSubmit(values) {
    const response = await axios
      .get(
        `https://backend-z2wzushc7q-uc.a.run.app/delete-user/${values.username}&${values.password}`
      )
      .then(() => form.reset())
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Text>
        Please enter the correct credentials for the user you want to delete
        from the database.
      </Text>
      <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
        <Stack align="flex-start">
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

          <Button type="submit">Delete User</Button>
        </Stack>
      </form>
    </>
  );
}

export default DeleteUser;
