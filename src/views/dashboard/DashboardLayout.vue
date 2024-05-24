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
          <v-list-item link :to="{ path: '/dashboard/overview' }" key="1"
            >Overview</v-list-item
          >
          <v-list-item link :to="{ path: '/dashboard/settings' }" key="2"
            >Stories</v-list-item
          >
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <router-view></router-view>
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
