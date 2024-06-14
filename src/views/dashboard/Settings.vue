
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" tile>
          <v-card-title>Countries</v-card-title>
          <v-data-table-virtual
            :loading="isCountryLoading"
            :headers="countryHeaders"
            :items="countries"
            disable-pagination
            :hide-default-footer="true"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="deleteCountry(item.id)"
                >mdi-delete</v-icon
              >
            </template>
          </v-data-table-virtual>

          <v-card-actions>
            <v-btn
              v-if="countries.length > 0"
              small
              color="error"
              @click="removeAllCountries"
            >
              Remove All
            </v-btn>

            <v-text-field
              type="input"
              v-model="newCountry"
              append-inner-icon="mdi-plus"
              density="compact"
              label="Add Country"
              variant="solo"
              hide-details
              single-line
              @click:append-inner="saveCountry"
            ></v-text-field>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" tile>
          <v-card-title>Genres</v-card-title>
          <v-data-table-virtual
            :loading="isGenreLoading"
            :headers="genreHeaders"
            :items="genres"
            disable-pagination
            :hide-default-footer="true"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="deleteGenre(item.id)"
                >mdi-delete</v-icon
              >
            </template>
          </v-data-table-virtual>

          <v-card-actions>
            <v-btn
              v-if="genres.length > 0"
              small
              color="error"
              @click="removeAllGenres"
            >
              Remove All
            </v-btn>

            <v-text-field
              type="input"
              v-model="newGenre"
              append-inner-icon="mdi-plus"
              density="compact"
              label="Add Genre"
              variant="solo"
              hide-details
              single-line
              @click:append-inner="saveGenre"
            ></v-text-field>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" tile>
          <v-card-title>Themes</v-card-title>
          <v-data-table-virtual
            class="table"
            :loading="isThemeLoading"
            :headers="themeHeaders"
            :items="themes"
            disable-pagination
            :hide-default-footer="true"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="deleteTheme(item.id)"
                >mdi-delete</v-icon
              >
            </template>
          </v-data-table-virtual>

          <v-card-actions>
            <v-btn
              v-if="themes.length > 0"
              small
              color="error"
              @click="removeAllThemes"
            >
              Remove All
            </v-btn>

            <v-text-field
              type="input"
              v-model="newTheme"
              append-inner-icon="mdi-plus"
              density="compact"
              label="Add Theme"
              variant="solo"
              hide-details
              single-line
              @click:append-inner="saveTheme"
            ></v-text-field>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" tile>
          <v-card-title>Languages</v-card-title>
          <v-data-table-virtual
            class="table"
            :headers="languageHeaders"
            :items="languages"
            disable-pagination
            :hide-default-footer="true"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="deleteLanguage(item.id)"
                >mdi-delete</v-icon
              >
            </template>
          </v-data-table-virtual>

          <v-card-actions>
            <v-btn
              v-if="languages.length > 0"
              small
              color="error"
              @click="removeAllLanguages"
            >
              Remove All
            </v-btn>

            <v-text-field
              :loading="isLanguageLoading"
              type="input"
              v-model="newLanguage"
              append-inner-icon="mdi-plus"
              density="compact"
              label="Add Language"
              variant="solo"
              hide-details
              single-line
              @click:append-inner="saveLanguage"
            ></v-text-field>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserServices from "@services/UserServices";
import CountryServices from "@services/CountryServices";
import GenreServices from "@services/GenreServices";
import ThemeServices from "@services/ThemeServices";
import LanguageServices from "@services/LanguageServices";

export default {
  name: "countries-list",
  data() {
    return {
      countries: [],
      genres: [],
      themes: [],
      languages: [],
      title: "",
      newCountry: "",
      newGenre: "",
      newTheme: "",
      newLanguage: "",
      isCountryLoading: false,
      isGenreLoading: false,
      isThemeLoading: false,
      isLanguageLoading: false,
      countryHeaders: [
        {
          text: "Country",
          align: "start",
          sortable: false,
          value: "country",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      genreHeaders: [
        {
          text: "Genre",
          align: "start",
          sortable: false,
          value: "genre",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      themeHeaders: [
        {
          text: "Theme",
          align: "start",
          sortable: false,
          value: "theme",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      languageHeaders: [
        {
          text: "Language",
          align: "start",
          sortable: false,
          value: "language",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    saveCountry() {
      var data = {
        country: this.newCountry,
      };

      CountryServices.create(data)
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.refreshCountries();
        });
    },
    saveGenre() {
      var data = {
        genre: this.newGenre,
      };

      GenreServices.create(data)
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.refreshGenres();
        });
    },
    saveTheme() {
      var data = {
        theme: this.newTheme,
      };

      ThemeServices.create(data)
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.refreshThemes();
        });
    },
    saveLanguage() {
      var data = {
        language: this.newLanguage,
      };

      LanguageServices.create(data)
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.refreshLanguages();
        });
    },

    retrieveCountries() {
      this.isCountryLoading = true;
      CountryServices.getCountries()
        .then((response) => {
          console.log(response);
          this.countries = response.data.map(this.getDisplayCountry);
          this.isCountryLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveGenres() {
      this.isGenreLoading = true;
      GenreServices.getGenres()
        .then((response) => {
          this.genres = response.data.map(this.getDisplayGenre);
          this.isGenreLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveThemes() {
      this.isThemeLoading = true;
      ThemeServices.getThemes()
        .then((response) => {
          this.themes = response.data.map(this.getDisplayTheme);
          this.isThemeLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveLanguages() {
      this.isLanguageLoading = true;
      LanguageServices.getLanguages()
        .then((response) => {
          this.languages = response.data.map(this.getDisplayLanguage);
          this.isLanguageLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshCountries() {
      this.newCountry = "";
      this.retrieveCountries();
    },
    refreshGenres() {
      this.newGenre = "";
      this.retrieveGenres();
    },
    refreshThemes() {
      this.newTheme = "";
      this.retrieveThemes();
    },
    refreshLanguages() {
      this.newLanguage = "";
      this.retrieveLanguages();
    },

    removeAllCountries() {
      CountryServices.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshCountries();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    removeAllGenres() {
      GenreServices.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshGenres();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    removeAllThemes() {
      ThemeServices.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshThemes();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    removeAllLanguages() {
      LanguageServices.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshLanguages();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteCountry(id) {
      CountryServices.delete(id)
        .then(() => {
          this.refreshCountries();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteGenre(id) {
      GenreServices.delete(id)
        .then(() => {
          this.refreshGenres();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteTheme(id) {
      ThemeServices.delete(id)
        .then(() => {
          this.refreshThemes();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteLanguage(id) {
      LanguageServices.delete(id)
        .then(() => {
          this.refreshLanguages();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayCountry(country) {
      return {
        id: country.id,
        country: country.country,
      };
    },
    getDisplayGenre(genre) {
      return {
        id: genre.id,
        genre: genre.genre,
      };
    },
    getDisplayTheme(theme) {
      return {
        id: theme.id,
        theme: theme.theme,
      };
    },
    getDisplayLanguage(language) {
      return {
        id: language.id,
        language: language.language,
      };
    },
  },
  mounted() {
    this.retrieveCountries();
    this.retrieveGenres();
    this.retrieveThemes();
    this.refreshLanguages();
  },
};
</script>
