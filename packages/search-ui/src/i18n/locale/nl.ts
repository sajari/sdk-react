import { Locale } from '../types';

const nl: Locale = {
  common: {
    result: 'Resultaat',
    results: 'Resultaten',
    items: 'Items',
    item: 'Item',
    loading: 'Bezig met laden',
    error: 'Fout',
  },
  errors: {
    authorization: 'Autorisatie voor dit verzoek is mislukt. Probeer het opnieuw.',
    connection: 'Controleer uw netwerkverbinding en probeer het opnieuw.',
    template: 'There was something wrong while parsing the template.',
    generic: 'Er is iets fout gegaan. Controleer alstublieft nog een keer.',
  },
  filter: {
    all: 'Alle',
    rangeOver: 'Over {{value}}',
    rangeUnder: 'Onder {{value}}',
    reset: 'Resetten',
    select: 'Selecteer een filter',
    selected: '{{count}} filters geselecteerd',
    showLess: 'Laat minder zien',
    showMore: 'Laat meer zien',
    show: 'Toon filters',
    hide: 'Filters verbergen',
  },
  input: {
    placeholder: 'Zoeken',
  },
  resultsPerPage: {
    label: 'Resultaten',
  },
  pagination: {
    label: 'Paginering',
    previous: 'Vorige',
    next: 'De volgende',
    page: 'Pagina {{page}}',
    current: 'Pagina {{page}}, huidige pagina',
  },
  results: {
    empty: {
      title: 'Geen resultaten',
      body: 'Er zijn geen overeenkomsten gevonden voor "{{query}}".',
    },
  },
  result: {
    status: {
      onSale: 'Te koop',
      outOfStock: 'Geen voorraad meer',
      newArrival: 'Nieuwe aankomst',
    },
    previewImagesContainer: "{{product}}'s beelden",
    previewImage: '{{product}} beeldnummer {{number}}',
  },
  sorting: {
    label: 'Soort',
    mostRelevantOption: 'Meest relevant',
  },
  summary: {
    results: '{{count}} {{object}} voor "{{query}}"',
    noQueryResults: '{{count}} {{object}}',
    latency: '({{time}} sec)',
    alternative: 'Zoek in plaats daarvan voor',
  },
  viewType: {
    label: 'Visie',
    grid: 'Raster',
    list: 'Lijst',
  },
};

export default nl;
