import { Stack, Text, Title } from "@mantine/core";
import AddUser from "../components/AddUser";
import ModifyUser from "../components/ModifyUser";
import DeleteUser from "../components/DeleteUser";

function Users() {
  return (
    <>
      <Stack align="flex-start">
        <Text>Here you can add, modify, and delete users.</Text>

        <Title order={2}>Add User</Title>
        <AddUser />
        <Title order={2}>Modify User</Title>
        <ModifyUser />
        <Title order={2}>Delete User</Title>
        <DeleteUser />
      </Stack>
    </>
  );
}

export default Users;
