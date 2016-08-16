// Api components
import { Aggregate, BucketAggregate, CountAggregate, MetricAggregate } from './components/Aggregate.js';
import Body from './components/Body.js';
import Fields from './components/Fields.js';
import Filter from './components/Filter.js';
import { FieldIndexBoost, ScoreIndexBoost } from './components/IndexBoost.js';
import { DistanceMetaBoost, ElementMetaBoost, GeoMetaBoost, IntervalMetaBoost, TextMetaBoost, FilterMetaBoost } from './components/MetaBoost.js';
import MaxResults from './components/MaxResults.js';
import Page from './components/Page.js';
import RegisterNamespace from './components/RegisterNamespace.js';
import ResultInjector from './components/ResultInjector.js';
import Sort from './components/Sort.js';
import Transform from './components/Transform.js';
import Run from './components/Run.js';

// Premade, bare-bones html elements wrapping api components
import BodyInput from './uicomponents/BodyInput.js';
import FilterSelect from './uicomponents/FilterSelect.js';
import MaxResultsSelect from './uicomponents/MaxResultsSelect.js';
import Pagination from './uicomponents/Pagination.js';
import RequestPreview from './uicomponents/RequestPreview.js';
import ResultRenderer from './uicomponents/ResultRenderer.js';
import SortSelect from './uicomponents/SortSelect.js';

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
