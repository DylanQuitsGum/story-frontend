<style scoped>
.layout {
  height: 100vh;
}
</style>

<template>
  <v-app>
    <v-layout class="border">
      <h1>Test</h1>
      <v-navigation-drawer v-mode="drawer" permanent>
        <v-list>
          <v-list-item key="1">Item 1</v-list-item>
          <v-list-item key="2">Item 1</v-list-item>
          <v-list-item key="3">Item 1</v-list-item>
          <v-list-item>Item 1</v-list-item>
          <v-list-item>Item 1</v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <h1>What</h1>
          <h1>What</h1>
          <h1>What</h1>
          <h1>What</h1>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import { ref, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const drawer = ref(true);

    return {
      drawer,
    };
  },
});
</script>
