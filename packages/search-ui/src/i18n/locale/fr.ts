import { Locale } from '../types';

const fr: Locale = {
  common: {
    result: 'Résultat',
    results: 'Résultats',
    items: 'Articles',
    item: 'Article',
    loading: 'Chargement',
    error: 'Erreur',
  },
  errors: {
    authorization: "L'autorisation de cette demande a échoué. Veuillez réessayer.",
    connection: 'Veuillez vérifier votre connexion réseau et réessayer.',
    template: {
      title: 'Oups!',
      body:
        'On dirait que nous avons du mal à analyser le modèle.<br/>Essayez de défaire vos modifications ou de passer la réinitialisation ci-dessous pour commencer à partir de zéro.',
    },
    generic: 'Une erreur est survenue. Veuillez réessayer ultérieurement. Merci.',
  },
  filter: {
    label: 'Filtres',
    all: 'Tout',
    rangeOver: 'Plus de {{value}}',
    rangeUnder: 'Sous {{value}}',
    reset: 'Réinitialiser',
    select: 'Sélectionnez un filtre',
    selected: '{{count}} Filtres sélectionnés',
    showLess: 'Afficher moins',
    showMore: 'Afficher plus',
    show: 'Afficher les filtres',
    hide: 'Masquer les filtres',
    toggleFilters: 'Basculer les filtres',
    clear: 'Effacer',
    apply: 'Appliquer',
  },
  input: {
    placeholder: 'Chercher',
  },
  resultsPerPage: {
    label: 'Résultats',
  },
  pagination: {
    label: 'Pagination',
    previous: 'Précédent',
    next: 'Prochain',
    page: 'Page {{page}}',
    current: 'Page {{page}}, page actuelle',
  },
  results: {
    empty: {
      title: 'Aucun résultat',
      body: 'Aucun résultat n\'a été trouvé pour "{{query}}".',
    },
  },
  result: {
    status: {
      onSale: 'En soldes',
      outOfStock: 'Rupture de stock',
      newArrival: 'Nouvelle arrivee',
    },
    previewImagesContainer: '{{product}} images',
    previewImage: "{{product}} numéro d'image {{number}}",
  },
  sorting: {
    label: 'Classement',
    mostRelevantOption: 'Le plus pertinent',
  },
  summary: {
    results: '{{count}} {{object}} pour "{{query}}"',
    noQueryResults: '{{count}} {{object}}',
    latency: '({{time}} secs)',
    alternative: 'Rechercher au lieu de',
  },
  viewType: {
    label: 'Vue',
    grid: 'Grille',
    list: 'Lister',
  },
};

export default fr;
