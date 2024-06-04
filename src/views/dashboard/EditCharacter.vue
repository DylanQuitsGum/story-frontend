<template>
    <div v-if="currentCharacter" class="edit-form py-3">
      <p class="headline">Edit Character</p>
  
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="currentCharacter.firstName"
          :rules="[(v) => !!v || 'First Name is required']"
          label="First Name"
          required
        ></v-text-field>
  
        <v-text-field
          v-model="currentCharacter.lastName"
          :rules="[(v) => !!v || 'Last Name is required']"
          label="Last Name"
          required
        ></v-text-field>
  
        <v-divider class="my-5"></v-divider>
  
        <v-btn color="success" small @click="updateCharacter">
          Update
        </v-btn>
      </v-form>
  
      <p class="mt-3">{{ message }}</p>
    </div>
  
    <div v-else>
      <p>Please click on a Character...</p>
    </div>
  </template>
  
  <script>
  import CharacterServices from "@services/CharacterServices";
  
  export default {
    name: "character",
    data() {
      return {
        currentCharacter: null,
        message: "",
      };
    },
    methods: {
      getCharacter(id) {
        CharacterServices.get(id)
          .then((response) => {
            this.currentCharacter = response.data;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },
  
      updateCharacter() {
        CharacterServices.update(this.currentCharacter.id, this.currentCharacter)
          .then((response) => {
            console.log(response.data);
            this.message = "The character was updated successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
    mounted() {
      this.message = "";
      this.getCharacter(this.$route.params.id);
    },
  };
  </script>
  
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  