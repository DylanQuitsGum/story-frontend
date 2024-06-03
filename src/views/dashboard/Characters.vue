<template>
  <div v-for="character in characters" :key="character">
    <p @click="edit($event, character)">
      {{ character.firstName }}
    </p>
  </div>

  <v-btn color="accent" large @click.stop="addNew">Add New</v-btn> 
  <CharacterForm :visible="showCharacterForm" :currentCharacter="currentCharacter" @close="closeDialog" persistent />
</template>

<script>
import { onMounted, ref } from 'vue'
import CharacterForm from '@components/CharacterDialog.vue'
import CharacterServices from '@services/CharacterServices'

export default {
  setup(props, { expose }) {
    const loading = ref(true);
    const characters = ref([]);

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

    expose
    (
      {
        loading,
        fetchData,
      }
    )

    return {
      characters
    }
  },
  data () {
   return {
     showCharacterForm: false,
     currentCharacterId: null
   }
 },
  methods: {
    addNew: function (event) {
      this.showCharacterForm = true;
    },
    edit: function (event, character){
      this.currentCharacter = character.id;
      this.showCharacterForm = true;
    },
    closeDialog: function (event){
      this.showCharacterForm = false;
    }
  },
  components:{
    CharacterForm
  }
}
</script>
