<template>
  <div class="User">
    <CButton icon="users" :iconSize="16" class="BackButton" @click="back">
      Back to users
    </CButton>
    <div v-if="this.$v.user.$invalid">
      <p :style="{ color: 'red' }">Fill all the fields</p>
    </div>
    <div v-else>
      <p :style="{ color: 'green' }">All fields are filled</p>
    </div>
    <form>
      <div class="UserInfo">
        <CInput
          name="Name"
          type="text"
          v-model="$v.user.name.$model"
          placeholder="Name"
          :error="
            $v.user.name.$error
              ? `Field must have at least ${$v.user.name.$params.minLength.min} characters.`
              : ''
          "
          class="Name"
        ></CInput>

        <CInput
          name="Email"
          type="email"
          v-model="$v.user.email.$model"
          placeholder="Email"
          :error="$v.user.email.$error ? `Field must be filled` : ''"
          class="Email"
        ></CInput>

        <CInput
          name="BirthDate"
          type="date"
          v-model="$v.user.birthDate.$model"
          placeholder="Birth Date"
          :error="$v.user.birthDate.$error ? `Field must be filled` : ''"
          class="BirthDate"
        ></CInput>
      </div>

      <div class="Address">
        <CInput
          name="Street"
          type="text"
          v-model="$v.user.address.street.$model"
          placeholder="Street"
          :error="$v.user.address.street.$error ? `Field must be filled` : ''"
          class="Street"
        ></CInput>

        <CInput
          name="City"
          type="text"
          v-model="$v.user.address.city.$model"
          placeholder="City"
          :error="$v.user.address.city.$error ? `Field must be filled` : ''"
          class="City"
        ></CInput>
      </div>
      <div class="Address">
        <CInput
          name="State"
          type="text"
          v-model="$v.user.address.state.$model"
          placeholder="State"
          :error="$v.user.address.state.$error ? `Field must be filled` : ''"
          class="State"
        ></CInput>

        <CInput
          name="Country"
          type="text"
          v-model="$v.user.address.country.$model"
          placeholder="Country"
          :error="$v.user.address.country.$error ? `Field must be filled` : ''"
          class="Country"
        ></CInput>

        <CInput
          name="Zip"
          type="text"
          v-model="$v.user.address.zip.$model"
          placeholder="Zip"
          :error="$v.user.address.zip.$error ? `Field must be filled` : ''"
          class="Zip"
        ></CInput>
      </div>
    </form>
    <CButton
      @click="handleSubmit"
      :disabled="this.$v.user.$invalid"
      class="SendButton"
    >
      {{ buttonText }}
    </CButton>
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength, email } from "vuelidate/lib/validators";
import { isEmpty } from "lodash";

import { CButton, CInput } from "@/components";

const initialUser = {
  name: "",
  email: "",
  birthDate: "",
  address: {
    street: "",
    state: "",
    city: "",
    country: "",
    zip: ""
  }
};

export default {
  name: "User",
  components: {
    CButton,
    CInput
  },
  data() {
    return {
      user: { ...initialUser }
    };
  },
  validations: {
    user: {
      name: { required, minLength: minLength(4) },
      email: { required, email },
      birthDate: { required },
      address: {
        street: { required },
        state: { required },
        city: { required },
        country: { required },
        zip: { required }
      }
    }
  },
  computed: {
    buttonText() {
      return this.$route.path === "/updateUsersById" ? "Update" : "Create";
    }
  },
  created() {
    if (!isEmpty(this.$route.query)) {
      const { id } = this.$route.query;
      axios
        .get(`https://cloudappi-database.web.app/api/users/${id}`)
        .then(response => {
          this.user = response.data.user;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  methods: {
    back() {
      this.$router.push({ path: "/" });
    },
    handleSubmit() {
      const { user } = this;
      if (!this.$v.user.$invalid) {
        if (this.$route.path === "/updateUsersById") {
          const { id } = this.$route.query;
          axios
            .put(`https://cloudappi-database.web.app/api/users/${id}`, {
              ...user
            })
            .then(this.$router.push("/"))
            .catch(e => {
              this.erros.push(e);
            });
        } else {
          axios
            .post("https://cloudappi-database.web.app/api/users", { ...user })
            .then(this.$router.push("/"))
            .catch(e => {
              this.erros.push(e);
            });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/theme/theme.scss";

.User {
  display: flex;
  flex-direction: column;
  p {
    text-align: right;
    margin: 15px 50px 30px 50px;
  }
  form {
    margin: 0px 50px;
  }
}
.UserInfo,
.Address {
  display: flex;
  .Name,
  .Email {
    flex: 2;
    margin-right: $spacer;
  }
  .BirthDate {
    flex: 1;
  }
  .Street,
  .State,
  .Country {
    flex: 2;
    margin-right: $spacer;
  }
  .City,
  .Zip {
    flex: 1;
  }
}
.BackButton,
.SendButton {
  font-size: 16px;
  padding: 5px 10px;
  margin-bottom: $spacer * 2;
}
.BackButton {
  align-self: flex-end;
}
.SendButton {
  align-self: center;
}
</style>
