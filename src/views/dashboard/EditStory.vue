
<style scoped>
.container {
  max-width: 900px;
}

.sheet {
  background: transparent;
}

.fixed-btn {
  width: 200px;
  font-weight: bold;
  color: white;
  background-image: linear-gradient(160deg, #00e9a3 0%, #8ad4b8 100%);
  z-index: 1000;
}

.load {
  height: 360px;
}

.grey {
  background: gray;
}

.delete {
  color: rgb(255, 110, 110);
}
</style>
<script>
import LanguageServices from "../../services/LanguageServices";
import GenreServices from "../../services/GenreServices";
import ThemeServices from "../../services/ThemeServices";
import CountryServices from "../../services/CountryServices";
import StoryServices from "../../services/StoryServices";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const prevLanguage = ref("");
    const prevCountry = ref("");
    const prevGenre = ref("");
    const prevTheme = ref("");
    const prevPageCountry = ref(0.5);

    const selectedLanguage = ref("");
    const selectedCountry = ref("");
    const selectedGenre = ref("");
    const selectedTheme = ref("");
    const selectedPageCount = ref(0.5);
    const selectedCharacters = ref([]);
    const isLoading = ref(false);
    const isSaving = ref(false);
    const isDeleted = ref(false);
    const isDeletedAttempt = ref(false);
    const story = ref({});

    const languages = ref([]);
    const genres = ref([]);
    const themes = ref([]);
    const countries = ref([]);
    const preamble = ref("");
    const storyConversationId = ref("");
    const storyOutput = ref("");
    const storyTitle = ref("");
    const saveAlert = ref(false);
    const storyId = ref(route.params.id);

    const textTemplate = `
Language: Should change to {language}}.
Setting: The story takes place in a {{country}}.
Genre: The genre of the story should be {{genre}}.
Theme: The story should be about {{theme}}.
Length: The story should be approximately {{pages}} pages long.
Target Audience: This story is aimed at preschoolers aged 3-5.
Tone: The tone should be gentle and heartwarming, with moments of humor.
`;

    const languageTemplate = `Please change the story language written to {{language}}`;
    const countryTemplate = `Please change the country in the story to {{country}}`;
    const genreTemplate = `Please change the story's genre to {{genre}}`;
    const themeTemplate = `Please change the story's theme to {{theme}}`;
    const pageCountTemplate = `Please change the story page count to {{pages}}`;

    watch(selectedLanguage, (newValue, oldValue) => {
      selectedLanguage.value = newValue;

      buildPreamble();
    });

    watch(selectedCountry, (newValue, oldValue) => {
      selectedCountry.value = newValue;
      buildPreamble();
    });

    watch(selectedGenre, (newValue, oldValue) => {
      selectedGenre.value = newValue;
      buildPreamble();
    });

    watch(selectedTheme, (newValue, oldValue) => {
      selectedTheme.value = newValue;
      buildPreamble();
    });

    watch(selectedPageCount, (newValue, oldValue) => {
      selectedPageCount.value = newValue;
      buildPreamble();
    });

    function buildPreamble() {
      const preambleNew = textTemplate
        .replace("{{language}}", selectedLanguage.value)
        .replace("{{country}}", selectedCountry.value)
        .replace("{{genre}}", selectedGenre.value)
        .replace("{{theme}}", selectedTheme.value)
        .replace("{{pages}}", selectedPageCount.value);

      preamble.value = preambleNew;
    }

    const fetchData = async () => {
      await fetchLanguages();
      await fetchGenres();
      await fetchThemes();
      await fetchCountries();
    };

    const fetchLanguages = async () => {
      try {
        const res = await LanguageServices.getLanguages();
        const { data, status } = res;

        if (status == 200) {
          languages.value = data;
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const fetchGenres = async () => {
      try {
        const res = await GenreServices.getGenres();
        const { data, status } = res;

        if (status == 200) {
          genres.value = data;
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const fetchThemes = async () => {
      try {
        const res = await ThemeServices.getThemes();
        const { data, status } = res;

        if (status == 200) {
          themes.value = data;
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const fetchCountries = async () => {
      try {
        const res = await CountryServices.getCountries();
        const { data, status } = res;

        if (status == 200) {
          countries.value = data;
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const update = async () => {
      isLoading.value = true;
      const preampleObj = {
        preamble: preamble.value,
        prompt: "Write me a children's story",
      };

      try {
        //const result = await StoryServices.createStory(preampleObj);
        // const { status, data } = result;
        // console.log(result);
        // if (status == 201) {
        //   storyConversationId.value = data.response.conversationId;
        //   storyOutput.value = data.response.story;
        //   storyTitle.value = data.response.title.replace(/['"]+/g, "");
        //   isLoading.value = false;
        // }
      } catch (err) {
        console.error(`Error: ${err}`);
      } finally {
        isLoading.value = false;
      }
    };

    const save = async () => {
      if (storyOutput.value == "" || storyTitle.value == "") return;

      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const result = await StoryServices.saveStory({
          story: storyOutput.value,
          conversationId: storyConversationId.value,
          title: storyTitle.value,
          userId: user.userId,
        });

        const { status } = result;

        if (status == 201) {
          saveAlert.value = true;
        }
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    };

    const fetchStory = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await StoryServices.getStoryById(user.userId, storyId.value);
      const { status, data } = res;

      if (status == 200) {
        story.value = data;
        storyTitle.value = data.title;
        storyOutput.value = data.text;
        storyConversationId.value = data.conversationId;

        prevLanguage.value = data.language;
        prevCountry.value = data.country;
        prevGenre.value = data.genre;
        prevTheme.value = data.theme;
        prevPageCountry.value = data.pageCount;

        selectedLanguage.value = data.language;
        selectedCountry.value = data.country;
        selectedGenre.value = data.genre;
        selectedTheme.value = data.theme;

        //check if language exist
        const languageExist = languages.value.some(
          (obj) => obj.language == data.language
        );
        const countryExist = countries.value.some(
          (obj) => obj.country == data.country
        );
        const genreExist = genres.value.some((obj) => obj.genre == data.genre);
        const themeExist = themes.value.some((obj) => obj.theme == data.theme);

        if (!languageExist) {
          languages.value.push({
            language: data.language,
          });
        }

        if (!countryExist) {
          countries.value.push({
            country: data.country,
          });
        }

        if (!genreExist) {
          genres.value.push({
            genre: data.genre,
          });
        }

        if (!themeExist) {
          themes.value.push({
            theme: data.theme,
          });
        }
      }
    };

    const deleteStory = async (story) => {
      isDeletedAttempt.value = true;
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await StoryServices.deleteStory(user.userId, story.id);
      const { status } = res;

      if (status == 200) {
        isDeleted.value = true;
      } else {
        isDeleted.value = false;
      }
    };

    onMounted(() => {
      fetchData();
      fetchStory();
      buildPreamble();
    });

    return {
      story,
      languages,
      genres,
      themes,
      countries,
      selectedLanguage,
      selectedCountry,
      selectedGenre,
      selectedTheme,
      selectedCharacters,
      selectedPageCount,
      storyOutput,
      storyTitle,
      isLoading,
      isSaving,
      isDeleted,
      isDeletedAttempt,
      saveAlert,
      update,
      save,
      deleteStory,
    };
  },
};
</script>


<template>
  <div>
    <div class="d-flex space-between">
      <h1 class="me-auto">Edit Story</h1>
      <v-btn class="delete" @click="deleteStory(story)">Delete</v-btn>
    </div>

    <div>
      <v-alert v-if="isDeleted" color="success" variant="outlined"
        >Story was deleted.
        <a href="/dashboard/stories">Go back to stories</a>
      </v-alert>

      <v-alert
        v-if="!isDeleted && isDeletedAttempt"
        color="error"
        variant="outlined"
        >Something went wrong. Please try again</v-alert
      >
    </div>
    <v-container class="container" v-if="!isDeleted">
      <div class="d-flex ga-4">
        <div>
          <h3>Build</h3>
          <br />
          <section>
            <v-select
              v-model="selectedLanguage"
              variant="outlined"
              density="compact"
              width="200"
              label="Languages"
              :items="languages.map((l) => l.language)"
            ></v-select>
          </section>

          <section>
            <v-select
              v-model="selectedCountry"
              variant="outlined"
              density="compact"
              width="200"
              label="Country"
              :items="countries.map((l) => l.country)"
            ></v-select>
          </section>

          <section>
            <v-select
              v-model="selectedGenre"
              variant="outlined"
              density="compact"
              width="200"
              label="Genre"
              :items="genres.map((l) => l.genre)"
            ></v-select>
          </section>

          <section>
            <v-select
              v-model="selectedTheme"
              variant="outlined"
              density="compact"
              width="200"
              label="Theme"
              :items="themes.map((l) => l.theme)"
            ></v-select>
          </section>

          <section>
            <v-select
              v-model="selectedPageCount"
              variant="outlined"
              density="compact"
              width="200"
              label="Page Count"
              :items="[1, 2, 3, 4]"
            ></v-select>
          </section>

          <section>
            <v-select
              v-model="selectedCharacters"
              variant="outlined"
              density="compact"
              width="200"
              label="Characters"
              :items="['bob', 'joe']"
              multiple
            ></v-select>
          </section>

          <div>
            <v-btn
              class="fixed-btn"
              :class="{ grey: isLoading }"
              :readonly="isLoading"
              @click="update"
            >
              <span class="px-2">Update</span>
              <img
                class="pr-1"
                src="./../../assets/icons/magic-wand.png"
                alt="hand settings"
                width="20"
            /></v-btn>
          </div>
        </div>
        <div class="flex-grow-1">
          <h3>Output</h3>
          <br />

          <div v-if="isLoading" class="load d-flex justify-center align-center">
            <v-progress-circular
              indeterminate
              color="green"
              :size="100"
              :width="12"
            ></v-progress-circular>
          </div>

          <div v-if="!isLoading">
            <v-text-field
              v-model="storyTitle"
              label="Title"
              variant="outlined"
            ></v-text-field>
            <v-textarea
              v-model="storyOutput"
              :rows="10"
              label="Story"
              variant="outlined"
            >
            </v-textarea>
          </div>

          <v-alert
            class="mb-4"
            v-model="saveAlert"
            type="success"
            variant="outlined"
            closable
          >
            {{ storyTitle }} was saved. You can read it
            <a href="/dashboard/stories">here</a>
          </v-alert>

          <v-btn
            class="fixed-btn float-right"
            :class="{ grey: isLoading }"
            :readonly="isLoading"
            @click="save"
            >Save</v-btn
          >
        </div>
      </div>
    </v-container>
  </div>
</template>

