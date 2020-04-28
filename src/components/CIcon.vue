<template>
  <i class="CIcon" :class="iconClass" :style="iconStyles" />
</template>

<script>
import VueTypes from "vue-types";

const colors = ["white", "black", "primary", "secondary"];

export default {
  name: "CIcon",
  props: {
    icon: VueTypes.string.isRequired,
    color: VueTypes.oneOf(colors).def("black"),
    size: VueTypes.number
  },
  computed: {
    iconClass() {
      return [`icon-${this.icon}`, this.color];
    },
    iconStyles() {
      const styles = {};
      if (this.size) styles.fontSize = `${this.size}px`;
      return styles;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/theme/theme.scss";

.CIcon {
  vertical-align: middle;
  &.white {
    color: $white;
  }
  &.black {
    color: $black;
  }
  &.primary {
    color: $primary;
  }
  &.secondary {
    color: $secondary;
  }
}
</style>
