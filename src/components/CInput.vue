<template>
  <div class="CInput" :class="{ error }">
    <input
      :value="value"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      v-on="inputListeners"
    />
    <FadeTransition>
      <p v-if="error" class="Error">
        {{ error }}
      </p>
    </FadeTransition>
  </div>
</template>

<script>
import VueTypes from "vue-types";
import { merge } from "lodash";
import { FadeTransition } from "@/components";

const TYPES = ["text", "email", "number", "date"];
export default {
  name: "CInput",
  components: {
    FadeTransition
  },
  props: {
    error: VueTypes.string.def(""),
    name: VueTypes.string.isRequired,
    placeholder: VueTypes.string.def(""),
    readonly: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    type: VueTypes.oneOf(TYPES).isRequired,
    value: VueTypes.oneOfType([String, Number]).isRequired
  },
  computed: {
    inputListeners() {
      return merge({}, this.$listeners, {
        input: event => {
          this.$emit("input", event.target.value, this.id);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/theme/theme.scss";

input {
  width: calc(100% - 10px);
  min-height: $form-height;
  margin-bottom: $spacer * 2;
  padding: 0 5px;
  border: none;
  border-bottom: $form-border;
  color: $form-color;
  background: transparent;
  font-size: $font-size;
  font-weight: $form-font-weight;
  transition: border-color 0.5s ease-in-out;

  &:focus {
    border-color: $form-border-color-active;
    outline: none;
  }
  &[readonly] {
    opacity: 0.5;
    cursor: default;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.CInput {
  position: relative;
  margin-bottom: 10px;
  &.error {
    input {
      border-color: $red;
    }
  }
}

.Error {
  position: absolute;
  font-size: $font-size;
  top: $spacer + 5px;
  left: 5px;
  color: $red;
}
</style>
