
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
import StoryCharacterServices from "../../services/StoryCharacterServices";
import CharacterServices from "../../services/CharacterServices";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const user = JSON.parse(localStorage.getItem("user"));
    const route = useRoute();
    const router = useRouter();

    const prevLanguage = ref("");
    const prevCountry = ref("");
    const prevGenre = ref("");
    const prevTheme = ref("");
    const prevPageCount = ref(0.5);

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
    const isDialogOpen = ref(false);
    const story = ref({});

    const languages = ref([]);
    const genres = ref([]);
    const themes = ref([]);
    const countries = ref([]);
    const userCharacters = ref([]);
    const storyConversationId = ref("");
    const storyOutput = ref("");
    const storyTitle = ref("");
    const saveAlert = ref(false);
    const storyId = ref(route.params.id);

    const languagePrompt = ref("");
    const countryPrompt = ref("");
    const genrePrompt = ref("");
    const themePrompt = ref("");
    const pageCountPrompt = ref("");
    const storyCharactersPrompt = ref("");

    const languageTemplate = `Change the story language written to {{language}}. `;
    const countryTemplate = `Change the country in the story to {{country}}. `;
    const genreTemplate = `Change the story genre to {{genre}}. `;
    const themeTemplate = `Change the story theme to {{theme}}. `;
    const pageCountTemplate = `Change the story's length to {{pageCount}} page long. `;

    watch(selectedLanguage, (newValue, oldValue) => {
      selectedLanguage.value = newValue;

      if (selectedLanguage.value != prevLanguage.value) {
        languagePrompt.value = languageTemplate.replace(
          "{{language}}",
          selectedLanguage.value
        );
      } else {
        languagePrompt.value = "";
      }
    });

    watch(selectedCountry, (newValue, oldValue) => {
      selectedCountry.value = newValue;

      if (selectedCountry.value != prevCountry.value) {
        countryPrompt.value = countryTemplate.replace(
          "{{country}}",
          selectedCountry.value
        );
      } else {
        countryPrompt.value = "";
      }
    });

    watch(selectedGenre, (newValue, oldValue) => {
      selectedGenre.value = newValue;

      if (selectedGenre.value != prevGenre.value) {
        genrePrompt.value = genreTemplate.replace(
          "{{genre}}",
          selectedGenre.value
        );
      } else {
        genrePrompt.value = "";
      }
    });

    watch(selectedTheme, (newValue, oldValue) => {
      selectedTheme.value = newValue;

      if (selectedTheme.value != prevTheme.value) {
        themePrompt.value = themeTemplate.replace(
          "{{theme}}",
          selectedTheme.value
        );
      } else {
        themePrompt.value = "";
      }
    });

    watch(selectedPageCount, (newValue, oldValue) => {
      selectedPageCount.value = newValue;

      if (selectedPageCount.value != prevPageCount.value) {
        pageCountPrompt.value = pageCountTemplate.replace(
          "{{pageCount}}",
          selectedPageCount.value
        );
      } else {
        pageCountPrompt.value = "";
      }
    });

    watch(userCharacters, (newValue, oldValue) => {
      userCharacters.value = newValue;
    });

    const updateCharacters = () => {
      let characterPromptBuilder = "";

      let characters = userCharacters.value.filter((c) => c.enabled);

      characters.map((c) => {
        let text = `The character is ${c.firstName}`;
        if (c.role != "") {
          text += ` with a role playing as ${c.role}.\n`;
        } else {
          text += ".\n";
        }

        characterPromptBuilder += text;
      });

      storyCharactersPrompt.value = characterPromptBuilder;
    };

    const fetchData = async () => {
      await fetchUserCharacters();
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

    const fetchUserCharacters = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await CharacterServices.getAll(user.userId);

        const { status, data } = res;

        if (status == 200) {
          userCharacters.value = data.map((c) => ({
            ...c,
            role: c.role,
            enabled: false,
          }));
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchStory = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await StoryServices.getStoryById(user.userId, storyId.value);

      const storyCharactersRes = await StoryCharacterServices.getAll({
        userId: user.userId,
        storyId: storyId.value,
      });

      const storyCharacterSet = new Map(
        storyCharactersRes.data.map((c) => [`${c.firstName} ${c.lastName}`, c])
      );

      const updatedCharacters = userCharacters.value.map((c) => {
        let obj = { ...c };
        if (storyCharacterSet.has(`${c.firstName} ${c.lastName}`)) {
          (obj.enabled = true),
            (obj.role = storyCharacterSet.get(
              `${c.firstName} ${c.lastName}`
            ).role);
        }
        return obj;
      });

      //fill the checkbox and role
      userCharacters.value = updatedCharacters;

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
        prevPageCount.value = data.pageCount;

        selectedLanguage.value = data.language;
        selectedCountry.value = data.country;
        selectedGenre.value = data.genre;
        selectedTheme.value = data.theme;
        selectedPageCount.value = data.pageCount;

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

    const update = async () => {
      isLoading.value = true;

      console.log("update!");
      console.log(storyConversationId.value);

      let newPrompt = `Refer to the story created from this conversation earlier.
        Don't give me the title, just update the story.\n`;

      if (languagePrompt.value != "") {
        newPrompt += languagePrompt.value;
      }

      if (countryPrompt.value != "") {
        newPrompt += countryPrompt.value;
      }

      if (genrePrompt.value != "") {
        newPrompt += genrePrompt.value;
      }

      if (themePrompt.value != "") {
        newPrompt += themePrompt.value;
      }

      if (pageCountPrompt.value != "") {
        newPrompt += pageCountPrompt.value;
      }

      if (storyCharactersPrompt.value != "") {
        newPrompt += `\n
        I will give you a list of characters. 
        If they already in the story with the same role, don't change it.
        If their name are in story, but are not on the list, remove them.
        If their name are on the list and not in the story, add them to the story. 
        If their name are on the list and in the story but has different role now, change their role in the story. \n`;

        newPrompt += ` The list is: \n`;
        newPrompt += storyCharactersPrompt.value;
      }

      console.log(newPrompt);

      const preambleObj = {
        preamble: "You are a children's book writer",
        prompt: newPrompt,
        conversationId: storyConversationId.value,
      };

      try {
        const result = await StoryServices.createStory(preambleObj);
        const { status, data } = result;
        console.log(result);

        if (status == 201) {
          storyConversationId.value = story.id;
          storyOutput.value = "";
          storyOutput.value = data.text;

          //update the story on db
          const updatedResult = await StoryServices.updateStory({
            storyId: storyId.value,
            title: storyTitle.value,
            story: storyOutput.value,
            conversationId: storyConversationId.value,
            userId: user.userId,
            language: selectedLanguage.value,
            country: selectedCountry.value,
            genre: selectedGenre.value,
            theme: selectedTheme.value,
            pageCount: selectedPageCount.value,
          });

          console.log(updatedResult);

          const { status } = updatedResult;

          if (status == 200) {
            saveAlert.value = true;
          }

          //delete all characters of this story
          const deleteResult = await StoryCharacterServices.deleteAll({
            userId: user.userId,
            storyId: storyId.value,
          });

          const storyCharacters = userCharacters.value
            .filter((c) => c.enabled)
            .map((c) => ({
              ...c,
              storyId: storyId.value,
              id: undefined,
            }));

          const storyCharacterResult = await StoryCharacterServices.create({
            userId: user.userId,
            storyId: storyId.value,
            data: storyCharacters,
          });

          isLoading.value = false;
        }
      } catch (err) {
        console.error(`Error: ${err}`);
      } finally {
        isLoading.value = false;
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

    const closeDialog = () => {
      isDialogOpen.value = false;
      updateCharacters();
    };

    onMounted(async () => {
      await fetchData();
      await fetchStory();
    });

    return {
      story,
      languages,
      genres,
      themes,
      countries,
      userCharacters,
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
      isDialogOpen,
      saveAlert,
      update,
      deleteStory,
      closeDialog,
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
              :items="[0.5, 1, 2, 3]"
            ></v-select>
          </section>

          <section>
            <v-btn
              class="mb-4"
              color="gray-2"
              append-icon="mdi-plus"
              width="200"
              variant="outlined"
              @click="isDialogOpen = true"
              >Characters</v-btn
            >
            <v-dialog width="auto" v-model="isDialogOpen" scrollable>
              <v-card class="pa-4 center-dialog" width="600">
                <h2>Add Characters to your story</h2>

                <v-list>
                  <v-list-item
                    v-for="character in userCharacters"
                    :key="character.id"
                  >
                    <template v-slot:prepend>
                      <v-checkbox v-model="character.enabled"></v-checkbox>
                    </template>

                    <template v-slot:title>
                      <h4>
                        {{ character.firstName }} {{ character.lastName }}
                      </h4>
                      <div class="d-flex ga-4">
                        <v-text-field
                          label="Role"
                          v-model="character.role"
                          placeholder="Thief, Archer, Warrior, Bishop, etc..."
                          variant="outlined"
                          density="compact"
                          width="100"
                          :disabled="!character.enabled"
                        ></v-text-field>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
                <template v-slot:actions>
                  <v-btn @click="closeDialog">Save</v-btn>
                </template>
              </v-card>
            </v-dialog>
          </section>

          <div>
            <v-btn
              class="mt-2"
              width="200"
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
        </div>
      </div>
    </v-container>
  </div>
</template>

