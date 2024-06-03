<template>
    <v-dialog v-model="show" max-width="500px" persistent="true">

      <v-text-field v-model="firstName"
                    hint="Enter a first name"
                    label="First Name"
                    type="input"
      ></v-text-field>

      <v-text-field v-model="lastName"
                    hint="Enter a last name"
                    label="Last Name"
                    type="input"
      ></v-text-field>

      <v-btn color="primary" flat @click.stop="save">Close</v-btn>
      <v-btn color="primary" flat @click.stop="cancel">Cancel</v-btn>
    </v-dialog>
    </template>
    
    <script>
    import CharacterServices from "@services/CharacterServices";
    import { onMounted, ref } from "vue";

    export default {
      data: () => ({
        firstName: null,
        lastName: null,
        userId: 1,
      }),
      props: ['visible', 'characterId'],
      computed: {
        show: {
          get () {
            return this.visible
          },
          set (value) {
            if (!value) {
              this.$emit('close')
            }
          }
        }
      },
      methods: {
        cancel: function (event){
          this.show=false;
        },
        save: function (event){
          const character = {
            firstName: this.firstName,
            lastName: this.lastName,
            userId: this.userId,
          };
          CharacterServices.addCharacter(character);
          this.show=false;
        }
      }
    }
    </script>