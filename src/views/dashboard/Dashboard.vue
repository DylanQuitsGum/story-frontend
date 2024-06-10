<style scoped>
.main {
  color: rgb(50, 50, 50);
}
.nav {
  background: #f6ffde;
}
</style>

<template>
  <div class="main">
    <v-app>
      <v-layout class="border">
        <v-navigation-drawer class="nav" permanent>
          <v-list>
            <v-list-item link :to="{ path: '/dashboard/overview' }" key="1">
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
            <v-list-item link :to="{ path: '/dashboard/settings' }" key="3">
              <template v-slot:prepend>
                <img src="./../../assets/icons/settings.png" width="20" />
              </template>
              <div class="px-2">Settings</div>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main class="main">
          <v-container>
            <router-view></router-view>
          </v-container>
        </v-main>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
</script>
