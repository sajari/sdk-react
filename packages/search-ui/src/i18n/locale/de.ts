import { Locale } from '../types';

const de: Locale = {
  common: {
    result: 'Ergebnis',
    results: 'Ergebnisse',
    items: 'Artikel',
    item: 'Artikel',
    loading: 'Wird geladen',
    error: 'Error',
  },
  errors: {
    authorization: 'Die Genehmigung für diese Anfrage ist fehlgeschlagen. Bitte versuche es erneut.',
    connection: 'Bitte überprüfen Sie Ihre Netzwerkverbindung und versuchen Sie es erneut.',
    template: {
      title: 'Hoppla!',
      body:
        'Sieht aus, als hätten wir Probleme beim Analysieren der Vorlage.<br/>Versuchen Sie, Ihre Änderungen rückgängig zu machen, oder den RESET-RESET unten, um von Grund auf zu beginnen.',
    },
    generic: 'Etwas ist schief gelaufen. Bitte überprüfen Sie noch einmal.',
  },
  filter: {
    label: 'Filtern',
    all: 'Alle',
    rangeOver: 'Über {{value}}',
    rangeUnder: 'Unter {{value}}',
    reset: 'Zurücksetzen',
    select: 'Wählen Sie einen Filter aus',
    selected: '{{count}} filter ausgewählt',
    showLess: 'Zeige weniger',
    showMore: 'Zeig mehr',
    show: 'Filter anzeigen',
    hide: 'Filter ausblenden',
    toggleFilters: 'Filter umschalten',
    clear: 'Klar',
    apply: 'Anwenden',
  },
  input: {
    placeholder: 'Suche',
  },
  resultsPerPage: {
    label: 'Ergebnisse',
  },
  pagination: {
    label: 'Seitennummerierung',
    previous: 'Vorherige',
    next: 'Nächste',
    page: 'Buchseite {{page}}',
    current: 'Buchseite {{page}}, aktuelle Seite',
  },
  results: {
    empty: {
      title: 'Keine Ergebnisse',
      body: 'Es wurden keine Treffer gefunden für "{{query}}".',
    },
  },
  result: {
    status: {
      onSale: 'Im Angebot',
      outOfStock: 'Ausverkauft',
      newArrival: 'Neuankömmling',
    },
    previewImagesContainer: '{{product}} Bildern',
    previewImage: '{{product}} Bildnummer {{number}}',
  },
  sorting: {
    label: 'Sortieren',
    mostRelevantOption: 'Relevanteste',
  },
  summary: {
    results: '{{count}} {{object}} für "{{query}}"',
    noQueryResults: '{{count}} {{object}}',
    latency: '({{time}} sek.)',
    alternative: 'Suchen stattdessen nach',
  },
  viewType: {
    label: 'Aussicht',
    grid: 'Gitter',
    list: 'Aufführen',
  },
};

export default de;
