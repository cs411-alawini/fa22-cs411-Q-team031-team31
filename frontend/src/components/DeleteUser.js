import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const INPUT_WIDTH = 300;

function DeleteUser() {
  const form = useForm({
    initialValues: {
      name: "",
      password: "",
    },
    validate: {
      name: (name) => (name.length <= 100 ? null : "Name is too long"),
      password: (password) =>
        password.length <= 100 ? null : "Password is too long",
    },
  });

  return (
    <>
      <Text>
        Please enter the correct credentials for the user you want to delete
        from the database.
      </Text>
      <form>
        <Stack align="flex-start">
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

          <Button type="submit">Delete User</Button>
        </Stack>
      </form>
    </>
  );
}

export default DeleteUser;
