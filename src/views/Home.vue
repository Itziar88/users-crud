<template>
  <div class="Home">
    <CButton
      icon="addUser"
      :iconSize="16"
      class="CreateButton"
      @click="addUser"
    >
      Create User
    </CButton>
    <table class="Table">
      <thead class="Header">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Birth Date</th>
          <th>Address</th>
          <th>Country</th>
          <th>Zip</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, name, email, birthDate, address } in users" :key="id">
          <td>{{ id }}</td>
          <td>{{ name }}</td>
          <td>{{ email }}</td>
          <td>{{ dateUpdated(birthDate) }}</td>
          <td>
            {{ address.street }} - {{ address.city }} ({{ address.state }})
          </td>
          <td>{{ address.country }}</td>
          <td>{{ address.zip }}</td>
          <td>
            <CButton icon="edit" @click="editUser(id)">
              Edit
            </CButton>
          </td>
          <td>
            <CButton icon="delete" @click="deleteUser(id)">
              Delete
            </CButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { CButton } from "@/components";

export default {
  name: "Home",
  components: {
    CButton
  },
  data() {
    return {
      users: [],
      errors: []
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    dateUpdated(date) {
      return moment(date).format("D MMMM YYYY");
    },
    getUsers() {
      axios
        .get("https://cloudappi-database.web.app/api/users")
        .then(response => {
          console.log(response);
          this.users = response.data.users;
          console.log(this.users);
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    editUser(id) {
      this.$router.push({ path: "/updateUsersById", query: { id: `${id}` } });
    },
    deleteUser(id) {
      this.$emit("delete", id);
      axios
        .delete(`hhttps://cloudappi-database.web.app/api/users/${id}`)
        .then(this.getUsers())
        .catch(e => {
          this.errors.push(e);
        });
    },
    addUser() {
      this.$router.push({ path: "createUser" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/theme/theme.scss";

.Home {
  display: flex;
  flex-direction: column;
  .CreateButton {
    align-self: flex-end;
    font-size: 16px;
    padding: 5px 10px;
    margin-bottom: $spacer * 2;
  }
}
.Table {
  width: 100%;
  font-size: $font-size;
  border-collapse: collapse;
  box-shadow: $box-shadow;
}
thead {
  font-size: 14px;
  border-bottom: 1px solid $black;
  background-color: rgba($secondary, 0.5);
  th {
    padding: 10px 5px;
  }
}
tbody {
  tr {
    border-bottom: 1px solid $black;
  }
  td {
    padding: 5px;
  }
}
</style>
