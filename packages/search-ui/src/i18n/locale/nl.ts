import { Locale } from '../types';

const nl: Locale = {
  common: {
    result: 'Resultaat',
    results: 'Resultaten',
    items: 'Artikelen',
    item: 'Artikel',
    loading: 'Bezig met laden',
    error: 'Fout',
  },
  errors: {
    authorization: 'Autorisatie voor dit verzoek is mislukt. Probeer het opnieuw.',
    connection: 'Controleer uw netwerkverbinding en probeer het opnieuw.',
    template: {
      title: 'Oeps!',
      body:
        'Het lijkt erop dat we problemen hebben met het parseren van de sjabloon.<br/>Probeer uw wijzigingen ongedaan te maken of HIT RESET HIERONDER om helemaal opnieuw te beginnen.',
    },
    generic: 'Er is iets fout gegaan. Controleer alstublieft nog een keer.',
  },
  filter: {
    all: 'Alle',
    rangeOver: 'Over {{value}}',
    rangeUnder: 'Onder {{value}}',
    reset: 'Reset',
    select: 'Selecteer een filter',
    selected: '{{count}} Filters geselecteerd',
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
    page: 'Bladzijde {{page}}',
    current: 'Bladzijde {{page}}, huidige pagina',
  },
  results: {
    empty: {
      title: 'Geen resultaten',
      body: 'Er zijn geen overeenkomsten gevonden voor "{{query}}".',
    },
  },
  result: {
    status: {
      onSale: 'Sale',
      outOfStock: 'Geen voorraad meer',
      newArrival: 'Nieuwe aankomst',
    },
    previewImagesContainer: '{{product}} afbeeldingen',
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
    label: 'Weergave',
    grid: 'Raster',
    list: 'Lijst',
  },
};

export default nl;
