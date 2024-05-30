

<script>
import LanguageServices from "../../services/LanguageServices";
import { onMounted, ref } from "vue";
export default {
  setup() {
    const languages = ref([]);
    const loading = ref(true);

    const fetchData = async () => {
      try {
        const res = await LanguageServices.getLanguages();
        const { data, status } = res;
        languages.value = data;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchData);

    return {
      languages,
      loading,
    };
  },
};
</script>


<template>
  <div>
    <h1>Overview</h1>
    <div>
      <pre>{{ languages }}</pre>
    </div>
  </div>
</template>

