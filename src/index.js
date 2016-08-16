// Api components
import { Aggregate, BucketAggregate, CountAggregate, MetricAggregate } from './api-components/Aggregate.js';
import Body from './api-components/Body.js';
import Fields from './api-components/Fields.js';
import Filter from './api-components/Filter.js';
import { FieldIndexBoost, ScoreIndexBoost } from './api-components/IndexBoost.js';
import { DistanceMetaBoost, ElementMetaBoost, GeoMetaBoost, IntervalMetaBoost, TextMetaBoost, FilterMetaBoost } from './api-components/MetaBoost.js';
import MaxResults from './api-components/MaxResults.js';
import Page from './api-components/Page.js';
import RegisterNamespace from './api-components/RegisterNamespace.js';
import ResultInjector from './api-components/ResultInjector.js';
import Sort from './api-components/Sort.js';
import Transform from './api-components/Transform.js';
import Run from './api-components/Run.js';

// Premade, bare-bones html elements wrapping api components
import BodyInput from './ui-components/BodyInput.js';
import FilterSelect from './ui-components/FilterSelect.js';
import MaxResultsSelect from './ui-components/MaxResultsSelect.js';
import Pagination from './ui-components/Pagination.js';
import RequestPreview from './ui-components/RequestPreview.js';
import ResultRenderer from './ui-components/ResultRenderer.js';
import SortSelect from './ui-components/SortSelect.js';

const SearchComponents = {
  Aggregate, BucketAggregate, CountAggregate, MetricAggregate,
  Body, Fields, Filter,
  FieldIndexBoost, ScoreIndexBoost,
  DistanceMetaBoost, ElementMetaBoost, GeoMetaBoost, IntervalMetaBoost, TextMetaBoost,
  FilterMetaBoost,
  MaxResults, Page, RegisterNamespace, ResultInjector, Sort, Transform, Run,
};

const UIComponents = {
  BodyInput, FilterSelect, MaxResultsSelect, ResultRenderer, SortSelect,
};

export { SearchComponents, UIComponents };
