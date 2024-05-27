<style scoped>
.layout {
  height: 100vh;
}
</style>

<template>
  <div>
    <v-app>
      <v-layout class="border">
        <h1>Test</h1>
        <v-navigation-drawer permanent>
          <v-list>
            <v-list-item link :to="{ path: '/dashboard' }" key="1">
              <template v-slot:prepend>
                <img src="./../../assets/icons/house.png" width="20" />
              </template>
              <div class="px-2">Overview</div>
            </v-list-item>
            <v-list-item link :to="{ path: '/dashboard/stories' }" key="2">
              <template v-slot:prepend>
                <img src="./../../assets/icons/reading-book.png" width="20" />
              </template>
              <div class="px-2">Stories</div>
            </v-list-item>
            <v-list-item link :to="{ path: '/dashboard/characters' }" key="3">
              <template v-slot:prepend>
                <img src="./../../assets/icons/girl.png" width="20" />
              </template>
              <div class="px-2">Characters</div>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main>
          <v-container>
            <router-view></router-view>
          </v-container>
        </v-main>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const drawer = ref("");

    return {
      drawer,
    };
  },
};
</script>
