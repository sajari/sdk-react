import { Locale } from '../types';

const it: Locale = {
  common: {
    result: 'Risultato',
    results: 'Risultati',
    items: 'Oggetti',
    item: 'Articolo',
    loading: 'Caricamento in corso',
    error: 'Errore',
  },
  errors: {
    authorization: 'Autorizzazione per questa richiesta non è riuscita. Per favore riprova.',
    connection: 'Si prega di controllare la connessione di rete e riprova.',
    template: "C'era qualcosa di sbagliato mentre analizzava il modello.",
    generic: 'Qualcosa è andato storto. Si prega di controllare di nuovo.',
  },
  filter: {
    all: 'Tutto',
    rangeOver: 'Oltre {{value}}',
    rangeUnder: 'Sotto {{value}}',
    reset: 'Ripristina',
    select: 'Seleziona un filtro',
    selected: '{{count}} filtri selezionati',
    showLess: 'Mostra meno',
    showMore: 'Mostra di più',
    show: 'Mostra filtri.',
    hide: 'Nascondi filtri',
  },
  input: {
    placeholder: 'Ricerca',
  },
  resultsPerPage: {
    label: 'Risultati',
  },
  pagination: {
    label: 'Pagination.',
    previous: 'Precedente',
    next: 'Prossimo',
    page: 'Pagina {{page}}',
    current: 'Pagina {{page}}, pagina corrente',
  },
  results: {
    empty: {
      title: 'Nessun risultato',
      body: 'Non sono state trovate corrispondenze per "{{query}}".',
    },
  },
  result: {
    status: {
      onSale: 'In vendita',
      outOfStock: 'Esaurito',
      newArrival: 'Nuovo arrivo',
    },
    previewImagesContainer: '{{product}} immagini',
    previewImage: "{{product}} numero dell'immagine {{number}}",
  },
  sorting: {
    label: 'Ordinare',
    mostRelevantOption: 'Più rilevanti',
  },
  summary: {
    results: '{{count}} {{object}} per "{{query}}"',
    noQueryResults: '{{count}} {{object}}',
    latency: '({{time}} sec)',
    alternative: 'Ricerca invece per',
  },
  viewType: {
    label: 'Visualizza',
    grid: 'Griglia',
    list: 'Elenco',
  },
};

export default it;
