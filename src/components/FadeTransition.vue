<template>
  <transition name="fade" :mode="mode">
    <slot />
  </transition>
</template>

<script>
import VueTypes from "vue-types";

export default {
  name: "FadeTransition",
  props: {
    mode: VueTypes.string.def("")
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
