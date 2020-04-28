<template>
  <div id="app">
    <h1 class="Title">Users list</h1>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
@import "@/theme/theme.scss";

#app {
  font-family: $font-family-sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $black;
  padding: $spacer;
}
.Title {
  margin: $spacer 0px;
}
</style>
