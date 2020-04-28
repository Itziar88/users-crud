<template>
  <button class="CButton" :disabled="disabled" @click="$emit('click')">
    <div class="Wrapper">
      <CIcon v-if="icon" :icon="icon" :size="iconSize"></CIcon>
      <span>
        <slot />
      </span>
    </div>
  </button>
</template>

<script>
import VueTypes from "vue-types";
import { CIcon } from "@/components";

export default {
  name: "CButton",
  components: {
    CIcon
  },
  props: {
    icon: VueTypes.string.def(""),
    iconSize: VueTypes.number.def(14),
    disabled: VueTypes.bool.def(false)
  }
};
</script>

<style lang="scss" scoped>
@import "@/theme/theme.scss";

.CButton {
  padding: 3px 6px;
  border-radius: $border-radius;
  background-color: $primary;
  font-size: $font-size;
  color: $black;
  outline: none;
  cursor: pointer;
  transition: $transition;
  &:hover {
    background-color: darken($primary, 10%);
  }
  &:disabled {
    cursor: default;
    background-color: antiquewhite;
  }
}

.Wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  .CIcon {
    margin-right: 5px;
  }
}
</style>
