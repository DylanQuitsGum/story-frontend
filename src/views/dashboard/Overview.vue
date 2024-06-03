
<style scoped>
.container {
  max-width: 900px;
}

.sheet {
  background: transparent;
}

.fixed-btn {
  float: right;
  bottom: 20px;
  right: 40px;
  width: 220px;
  font-weight: bold;
  color: white;
  background-image: linear-gradient(160deg, #00e9a3 0%, #8ad4b8 100%);
  z-index: 1000;
}
</style>
<script>
import LanguageServices from "../../services/LanguageServices";
import GenreServices from "../../services/GenreServices";
import ThemeServices from "../../services/ThemeServices";
import CountryServices from "../../services/CountryServices";

import { onMounted, ref } from "vue";
export default {
  setup() {
    const selectedLanguage = ref("");
    const languages = ref([]);
    const genres = ref([]);
    const themes = ref([]);
    const countries = ref([]);
    const loading = ref(true);

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

        console.log(data);
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

        console.log(data);
        if (status == 200) {
          countries.value = data;
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const toggle = () => {};

    onMounted(fetchData);

    return {
      languages,
      genres,
      themes,
      countries,
      loading,
      toggle,
    };
  },
};
</script>


<template>
  <div>
    <h1>Craft your story</h1>
    <v-container class="container">
      <section>
        <h2>Select a Language</h2>

        <v-sheet class="sheet mx-auto" max-width="800">
          <v-slide-group center-active show-arrows>
            <v-slide-group-item v-for="(item, index) in languages" :key="index">
              <v-card
                :class="['ma-4']"
                height="150"
                width="130"
                @click="toggle"
              >
                <div class="d-flex fill-height align-center justify-center">
                  <v-scale-transition>
                    {{ item.language }}
                  </v-scale-transition>
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </section>

      <br />
      <br />

      <section>
        <h2>Country</h2>

        <v-sheet class="sheet mx-auto" max-width="800">
          <v-slide-group center-active show-arrows>
            <v-slide-group-item v-for="(item, index) in countries" :key="index">
              <v-card
                :class="['ma-4']"
                height="150"
                width="130"
                @click="toggle"
              >
                <div class="d-flex fill-height align-center justify-center">
                  <v-scale-transition>
                    {{ item.country }}
                  </v-scale-transition>
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </section>

      <br />
      <br />

      <section>
        <h2>Select a Genre</h2>

        <v-sheet class="sheet mx-auto" max-width="800">
          <v-slide-group center-active show-arrows>
            <v-slide-group-item v-for="(item, index) in genres" :key="index">
              <v-card
                :class="['ma-4']"
                height="150"
                width="130"
                @click="toggle"
              >
                <div
                  class="d-flex fill-height align-center justify-center text-center"
                >
                  <v-scale-transition>
                    {{ item.genre }}
                  </v-scale-transition>
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </section>

      <br />
      <br />

      <section>
        <h2>Theme</h2>

        <v-sheet class="sheet mx-auto" max-width="800">
          <v-slide-group center-active show-arrows>
            <v-slide-group-item v-for="(item, index) in themes" :key="index">
              <v-card
                :class="['ma-4']"
                height="150"
                width="130"
                @click="toggle"
              >
                <div
                  class="d-flex fill-height align-center justify-center text-center"
                >
                  <v-scale-transition>
                    {{ item.theme }}
                  </v-scale-transition>
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </section>

      <br />
      <br />

      <div>
        <v-btn class="fixed-btn">Create</v-btn>
      </div>
    </v-container>
  </div>
</template>

