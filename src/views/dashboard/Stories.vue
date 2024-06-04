<script>
import { ref, onMounted } from "vue";
import StoryServices from "../../services/StoryServices";

export default {
  setup() {
    const stories = ref([]);

    const fetchStories = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await StoryServices.getStories(user.userId);

      console.log(res);

      const { data } = res;

      stories.value = data;
    };

    onMounted(async () => {
      console.log("mount");
      await fetchStories();
    });

    return {
      stories,
    };
  },
};
</script>


<template>
  <div>
    <div>Stories</div>

    <pre>
      {{ stories }}
    </pre>
  </div>
</template>