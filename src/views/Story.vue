<style scoped>
.page {
  padding: 16px 32px;
}

.text {
  white-space: pre-line;
}
</style>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import StoryServices from "../services/StoryServices";

export default {
  setup() {
    const story = ref({});
    const route = useRoute();
    const storyId = ref(route.params.id);
    console.log(storyId.value);

    const fetchStory = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await StoryServices.getStoryById(user.userId, storyId.value);

      const { status, data } = res;

      if (status == 200) {
        story.value = data;
      }
    };

    onMounted(() => {
      fetchStory();
    });

    return {
      story,
    };
  },
};
</script>


<template>
  <div class="page">
    <v-container>
      <div>
        <h1>{{ story.title }}</h1>
        <div class="text">
          {{ story.text }}
        </div>
      </div>
    </v-container>
  </div>
</template>

