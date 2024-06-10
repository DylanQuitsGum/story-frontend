<template>
  <div class="submit-form mt-3 mx-auto">
    <h2 class="headline">Add Character</h2>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          variant="outlined"
          v-model="character.firstName"
          :rules="[(v) => !!v || 'First Name is required']"
          label="First Name"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="character.lastName"
          :rules="[(v) => !!v || 'Last Name is required']"
          label="Last Name"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveCharacter">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Submitted successfully! </v-card-title>

        <v-card-subtitle>
          Click the button to add new Character.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newCharacter">Add</v-btn>
          <v-btn color="success" @click="listCharacters">Return</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import CharacterServices from "@services/CharacterServices";

export default {
  name: "add-character",
  data() {
    return {
      character: {
        id: null,
        firstName: "",
        lastName: "",
        userId: 1,
      },
      submitted: false,
    };
  },
  methods: {
    saveCharacter() {
      var data = {
        firstName: this.character.firstName,
        lastName: this.character.lastName,
        userId: this.character.userId,
      };

      CharacterServices.create(data)
        .then((response) => {
          this.character.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newCharacter() {
      this.submitted = false;
      this.character = {};
    },
    listCharacters() {
      this.$router.push({ name: "characters-list" });
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
