<style scoped>
.description {
  height: 140px;
  overflow: hidden;
}
</style>
<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import StoryServices from "../../services/StoryServices";

export default {
  setup() {
    const router = useRouter();
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

    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    };

    const readStory = (story) => {
      if (story) {
        router.push({
          path: `/story/${story.id}`,
        });
      }

      return;
    };

    const editStory = (story) => {
      if (story) {
        router.push({
          path: `/dashboard/edit/${story.id}`,
        });
      }

      return;
    };

    return {
      stories,
      truncateText,
      readStory,
      editStory,
    };
  },
};
</script>


<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="(story, index) in stories"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card height="260px" class="pa-2">
            <v-card-title>{{ story.title }}</v-card-title>
            <!-- <v-card-subtitle>{{ story.story }}</v-card-subtitle> -->
            <v-card-text class="description">{{
              truncateText(story.text, 150)
            }}</v-card-text>

            <v-card-actions>
              <v-btn text="Read" @click="readStory(story)"></v-btn>
              <v-btn text="Edit" @click="editStory(story)"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>