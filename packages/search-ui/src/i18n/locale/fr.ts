export default {
  common: {
    result: 'Résultat',
    results: 'Résultats',
    items: 'Éléments',
    item: 'Article',
    loading: 'Chargement',
    error: 'Erreur',
  },
  errors: {
    authorization: "L'autorisation de cette demande a échoué. Veuillez réessayer.",
    connection: 'Veuillez vérifier votre connexion réseau et réessayer.',
    generic: "Quelque chose s'est mal passé. S'il vous plaît vérifier à nouveau.",
  },
  filter: {
    all: 'Tout',
    rangeOver: 'Sur {{value}}',
    rangeUnder: 'Sous {{value}}',
    reset: 'Réinitialiser',
    select: 'Sélectionnez un filtre',
    selected: '{{count}} filtres sélectionnés',
    showLess: 'Montrer moins',
    showMore: 'Montre plus',
    show: 'Afficher les filtres',
    hide: 'Masquer les filtres',
  },
  input: {
    placeholder: 'Rechercher',
  },
  resultsPerPage: {
    label: 'Résultats',
  },
  pagination: {
    label: 'Pagination',
    previous: 'Précédent',
    next: 'Suivant',
    page: 'Page {{page}}',
    current: 'Page {{page}}, page actuelle',
  },
  results: {
    empty: {
      title: 'Aucun résultat',
      body: 'Aucun match n\'a été trouvé pour "{{query}}".',
    },
  },
  result: {
    previewImagesContainer: '{{product}} images',
    previewImage: "{{product}}  [Produit] numéro d'image {{number}}",
  },
  sorting: {
    label: 'Sorte',
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
