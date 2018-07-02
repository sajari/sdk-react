import i18next from "i18next";
// @ts-ignore: module missing defs file
import LngDetector from "i18next-browser-languagedetector";

export const i18n = i18next.use(LngDetector).init({
  fallbackLng: "en",
  resources: {
    en: {
      summary: {
        page: "Page {{pageNumber}} of",
        resultsFor: "results for",
        searchInstead: "search instead for"
      },
      errors: {
        authorization:
          "Authorization for this request failed. Check your credentials.",
        connection: "Please check your network connection.",
        parseResponse: "Unable to parse response."
      }
    }
  }
});
