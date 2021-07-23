import { Locale } from '../types';

const es: Locale = {
  common: {
    result: 'Resultado',
    results: 'Resultados',
    items: 'Artículos',
    item: 'Artículo',
    loading: 'Cargando',
    error: 'Error',
  },
  errors: {
    authorization: 'La autorización para esta solicitud falló. Inténtalo de nuevo.',
    connection: 'Por favor revise su conexión de red e intente nuevamente.',
    template: 'There was something wrong while parsing the template.',
    generic: 'Algo salió mal. Por favor revise de nuevo.',
  },
  filter: {
    all: 'Todos',
    rangeOver: 'Sobre {{value}}',
    rangeUnder: 'Debajo {{value}}',
    reset: 'Reiniciar',
    select: 'Seleccione un filtro',
    selected: '{{count}} Filtros seleccionados',
    showLess: 'Muestra menos',
    showMore: 'Mostrar más',
    show: 'Mostrar filtros',
    hide: 'Ocultar filtros',
  },
  input: {
    placeholder: 'Búsqueda',
  },
  resultsPerPage: {
    label: 'Resultados',
  },
  pagination: {
    label: 'Paginación',
    previous: 'Anterior',
    next: 'Próximo',
    page: 'Página {{page}}',
    current: 'Página {{page}}, página actual',
  },
  results: {
    empty: {
      title: 'No hay resultados',
      body: 'No se encontraron coincidencias para "{{query}}".',
    },
  },
  result: {
    status: {
      onSale: 'En venta',
      outOfStock: 'Agotado',
      newArrival: 'Nueva llegada',
    },
    previewImagesContainer: '{{product}} imagenes',
    previewImage: '{{product}} número de imagen {{number}}',
  },
  sorting: {
    label: 'Clasificar',
    mostRelevantOption: 'Lo más relevante',
  },
  summary: {
    results: '{{count}} {{object}} para "{{query}}"',
    noQueryResults: '{{count}} {{object}}',
    latency: '({{time}} segundos)',
    alternative: 'Buscar en lugar de',
  },
  viewType: {
    label: 'Ver',
    grid: 'Red',
    list: 'Lista',
  },
};

export default es;
