<script setup>
import LogoImage from "@/assets/logo.jpeg";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices";

const router = useRouter();

const user = ref(undefined);
const logoURL = ref("");

onMounted(() => {
  logoURL.value = "./assets/logo.jpeg";
  const storedUser = localStorage.getItem("user");
  user.value = storedUser && JSON.parse(storedUser);
});

function logout() {
  UserServices.logoutUser();
  router.push({
    name: "home",
  });
}
</script>

<template>
  <div>
    <v-app-bar app dark flat>
      <router-link :to="{ name: 'home' }">
        <v-img
          class="mx-2"
          :src="LogoImage"
          height="50"
          width="50"
          contain
        ></v-img>
      </router-link>
      <v-toolbar-title class="title"> DreamCraft </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" :to="{ name: 'home' }"> Stories </v-btn>
      <v-btn v-if="!user" class="mx-2" :to="{ name: 'register' }">
        Register
      </v-btn>
      <v-btn v-if="user" class="mx-2" :to="{ name: 'overview' }">
        Dashboard
      </v-btn>
      <v-btn v-if="user == undefined" class="mx-2" :to="{ name: 'login' }">
        Login
      </v-btn>
      <v-btn v-if="user != undefined" @click="logout">Logout</v-btn>
    </v-app-bar>
  </div>
</template>
