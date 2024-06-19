
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
</style>
<script>
import LanguageServices from "../../services/LanguageServices";
import GenreServices from "../../services/GenreServices";
import ThemeServices from "../../services/ThemeServices";
import CountryServices from "../../services/CountryServices";
import StoryServices from "../../services/StoryServices";
import CharacterServices from "../../services/CharacterServices";
import StoryCharacterServices from "../../services/StoryCharacterServices";
import { onMounted, ref, watch } from "vue";

export default {
  setup() {
    const selectedLanguage = ref("");
    const selectedCountry = ref("");
    const selectedGenre = ref("Adventure");
    const selectedTheme = ref("Friendship");
    const selectedPageCount = ref(0.5);
    const selectedCharacters = ref([]);
    const isLoading = ref(false);
    const isSaving = ref(false);
    const isDialogOpen = ref(false);

    const languages = ref([]);
    const genres = ref([]);
    const themes = ref([]);
    const countries = ref([]);
    const userCharacters = ref([]);
    const preamble = ref("");
    const storyConversationId = ref("");
    const storyOutput = ref("");
    const storyTitle = ref("");
    const characterPrompt = ref("");
    const saveAlert = ref(false);

    const preambleTemplate = `
Language: Should be written in {{language}}.
Setting: The story takes place in a {{country}}.
Genre: The genre of the story should be {{genre}}.
Theme: The story should be about {{theme}}.
Length: The story should be approximately {{pages}} pages long.
Target Audience: This story is aimed at preschoolers aged 3-5.
Tone: The tone should be gentle and heartwarming, with moments of humor.
`;

    const characterTemplate = `Include the character in the story name {{name}}`;

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

    watch(selectedCharacters, (newValue, oldValue) => {
      console.log(newValue);
      selectedCharacters.value = newValue;
    });

    function buildPreamble() {
      const preambleNew = preambleTemplate
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
      await fetchCharacters();
    };

    const fetchLanguages = async () => {
      try {
        const res = await LanguageServices.getLanguages();
        console.log(res);
        const { data, status } = res;

        if (status == 200) {
          languages.value = data;
          selectedLanguage.value = languages.value[0].language || "";
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
          selectedGenre.value = genres.value[0].genre || "";
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
          selectedTheme.value = themes.value[0].theme || "";
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
          selectedCountry.value = countries.value[0].country || "";
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    const fetchCharacters = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      try {
        const res = await CharacterServices.getAll(user.userId);

        const { status, data } = res;

        if (status == 200) {
          userCharacters.value = data.map((character) => ({
            ...character,
            role: "",
            enabled: false,
          }));
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    const create = async () => {
      isLoading.value = true;

      let promptTextBuilder =
        "Write me a children's story. Don't give me the title.\n";

      if (characterPrompt.value != "") {
        promptTextBuilder += characterPrompt.value;
      }

      const preambleObj = {
        preamble: preamble.value,
        prompt: promptTextBuilder,
      };

      try {
        const result = await StoryServices.createStory(preambleObj);
        const { status, data } = result;

        if (status == 201) {
          storyConversationId.value = data.response.conversationId;
          storyOutput.value = data.response.story;
          storyTitle.value = data.response.title.replace(/['"]+/g, "");
          isLoading.value = false;
        }
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
          language: selectedLanguage.value,
          country: selectedCountry.value,
          genre: selectedGenre.value,
          theme: selectedTheme.value,
          pageCount: selectedPageCount.value,
        });

        const { data, status } = result;
        const storyId = data.id;

        if (selectedCharacters.value.length > 0) {
          const storyCharacters = selectedCharacters.value.map((c) => ({
            ...c,
            storyId,
            id: undefined,
          }));

          const storyCharacterResult = await StoryCharacterServices.create({
            userId: user.userId,
            storyId,
            data: storyCharacters,
          });
        }

        if (status == 201) {
          saveAlert.value = true;
        }
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    };

    const closeDialog = () => {
      isDialogOpen.value = false;
      selectedCharacters.value = userCharacters.value.filter((c) => c.enabled);

      let characterPromptBuilder = "";
      if (selectedCharacters.value.length > 0) {
        selectedCharacters.value.map((c) => {
          let characterText = characterTemplate.replace(
            "{{name}}",
            c.firstName
          );
          if (c.role != "") {
            characterText += ` playing as ${c.role}. `;
          } else {
            characterText += ". ";
          }

          characterPromptBuilder += characterText;
        });
      }

      characterPrompt.value = characterPromptBuilder;
    };

    onMounted(async () => {
      await fetchData();
      await buildPreamble();
    });

    return {
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
      isDialogOpen,
      saveAlert,
      create,
      save,
      closeDialog,
    };
  },
};
</script>


<template>
  <div>
    <h1>Craft your story</h1>
    <v-container class="container">
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
                      <v-checkbox
                        :value="character.id"
                        v-model="character.enabled"
                      ></v-checkbox>
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
              class="success mt-2"
              width="200"
              :class="{ grey: isLoading }"
              :readonly="isLoading"
              @click="create"
            >
              <span class="px-2">CRAFT</span>
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
            v-if="storyTitle != '' && storyOutput != ''"
            >Save</v-btn
          >
        </div>
      </div>
    </v-container>
  </div>
</template>

