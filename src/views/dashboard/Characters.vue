<script>
import CharacterServices from "../../services/CharacterServices";
import { onMounted, ref } from "vue";
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
};
</script>


<template>
  <div>
    <h1>Characters</h1>
    <div>
      <pre>{{ characters }}</pre>
    </div>
  </div>
</template>

