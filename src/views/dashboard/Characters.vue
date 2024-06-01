<template>
  <ul>
    <li v-for="(character, index) in characters" :key="index">
      <p>
        {{ character.firstName }}
        <v-btn color="accent" large @click.stop="edit">Edit</v-btn>   
      </p>
    </li>
  </ul>

  <v-btn color="accent" large @click.stop="addNew(character.id)">Add New</v-btn>   
  <CharacterForm :visible="showCharacterForm" @close="showCharacterForm=false" persistent />
</template>

<script>
import CharacterServices from "@services/CharacterServices";
import { onMounted, ref } from "vue";
import CharacterForm from '@components/CharacterDialog.vue'

export default {
  setup() {
    const characters = ref([]);
    const loading = ref(true);

    const fetchData = async () => {
      try {
        const res = await CharacterServices.getCharacters();
        const { data, status } = res;
        characters.value = data;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchData);

    return {
      characters,
      loading,
    };
  },
 data () {
   return {
     showCharacterForm: false
   }
 },
 components: {
  CharacterForm
 },
 methods:{
  addNew: function (event){
    this.showCharacterForm = true;
  },
  edit: function (event, id){
    this.showCharacterForm = true;
  }
 }
}
</script>
