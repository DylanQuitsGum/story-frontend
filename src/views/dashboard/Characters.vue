<template>
  <v-row align="center" class="list px-3 mx-auto">

    <v-col cols="12" md="4">
      <v-btn small @click="addCharacter">
        Add Character
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Characters</v-card-title>
          <v-data-table :headers="headers"
                        :items="characters"
                        disable-pagination
                        :hide-default-footer="true">
            <template v-slot:[`item.actions`]="{item}">
              <v-icon small class="mr-2" @click="editCharacter(item.id)">mdi-pencil</v-icon>
              <v-icon small class="mr-2" @click="deleteCharacter(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>

          <v-card-actions v-if="characters.length > 0">
            <v-btn small color="error" @click="deleteAllCharacters">
            Remove All
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-col>

  </v-row>
</template>

<script>
import CharacterServices from "@services/CharacterServices";
export default {
  name: "characters-list",
  data() {
    return {
      characters: [],
      title: "",
      headers: [
        { text: "First Name", align: "start", sortable: false, value: "firstName" },
        { text: "Last Name", value: "lastName", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveCharacters() {
      CharacterServices.getAll()
        .then((response) => {
          this.characters = response.data.map(this.getDisplayCharacter);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCharacters();
    },

    removeAllCharacters() {
      CharacterServices.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editCharacter(id) {
      this.$router.push({ name: "character-details", params: { id: id } });
    },

    deleteCharacter(id) {
      CharacterServices.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayCharacter(character) {
      return {
        id: character.id,
        firstName: character.firstName,
        lastName: character.lastName,
      };
    },
  },
  mounted() {
    this.retrieveCharacters();
  },
};
</script>
