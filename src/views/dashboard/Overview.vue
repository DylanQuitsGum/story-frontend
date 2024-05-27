

<script>
import LanguageServices from "../../services/LanguageServices";
export default {
  data() {
    return {
      data: [],
    };
  },
  async mounted() {
    try {
      const response = await LanguageServices.getLanguages();
      this.data = response.data;
      console.log(this.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  },
  setup() {},
};
</script>


<template>
  <div>
    <h1>Ovewrview</h1>
    <div>
      <pre>
        {{ data }}
      </pre>
    </div>
  </div>
</template>

