<script>
import { ref, onMounted } from "vue";
import StoryServices from "../../services/StoryServices";

export default {
  setup() {
    const stories = ref([]);

    const fetchStories = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = StoryServices.getStories(user.userId);

      console.log(res);
    };

    onMounted(() => {
      console.log("mount");
      fetchStories();
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