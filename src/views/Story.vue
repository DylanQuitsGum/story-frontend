<style scoped>
.page {
  padding: 16px 32px;
}

.text {
  white-space: pre-line;
}

.export-btn {
  background-color: #4af66f;
  background-image: linear-gradient(160deg, #64f6a1 0%, #62f8b5 100%);
}
</style>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import jsPDF from "jspdf";
import "jspdf-autotable";

import StoryServices from "../services/StoryServices";

export default {
  setup() {
    const story = ref({});
    const route = useRoute();
    const storyId = ref(route.params.id);

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

    const exportToPDF = () => {
      const title = document.querySelector("#title");
      const text = document.querySelector("#text");

      const pdf = new jsPDF();
      const margin = 20;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const maxLineWidth = pageWidth - margin * 2;
      const lineHeight = 5;
      let cursorY = margin;

      pdf.setFontSize(20);
      pdf.text(title.textContent, 10, 10);

      let content = text ? text.textContent : "";

      const lines = pdf.splitTextToSize(content, maxLineWidth);
      pdf.setFontSize(12);

      lines.forEach((line) => {
        if (cursorY + lineHeight > pageHeight - margin) {
          pdf.addPage();
          cursorY = margin;
        }
        pdf.text(line, margin, cursorY);
        cursorY += lineHeight;
      });

      pdf.save(`${title.textContent.replace(/ /g, "_")}`);
    };

    return {
      story,
      exportToPDF,
    };
  },
};
</script>


<template>
  <div class="page">
    <v-container>
      <div>
        <div class="d-flex justify-end">
          <v-btn class="export-btn rounded-xl" @click="exportToPDF"
            >Export to PDF</v-btn
          >
        </div>

        <div id="content">
          <h1 id="title">{{ story.title }}</h1>
          <div id="text" class="text">
            {{ story.text }}
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

